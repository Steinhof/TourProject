const fs = require('fs');
const glob = require('glob');

// Simply write BEACON-STATIC for static files or BEACON-MUTABLE for mutable files

interface Options {
    publicPath: string;
}

class FillSW {
    public swFile: string;

    public options: Options;

    public dir: string;

    private dirFiles: string;

    private rawSWFile: string;

    readonly SEARCH_BEACON_STATIC = /.BEACON-STATIC./gi;

    readonly SEARCH_BEACON_MUTABLE = /.BEACON-MUTABLE./gi;

    constructor(swFile: string, options: Options) {
        this.swFile = swFile; // Initialize Service worker file
        this.options = options;
        this.readSWFile();
    }

    private readSWFile(): void {
        const readFile = fs.readFileSync(this.swFile);
        this.rawSWFile = readFile.toString();
    }

    private getDirFiles(dir: string) {
        const readData = glob.sync(dir);
        const trimPath = readData
            .map((item: string) => item.match(/[\w\d-_]+\.\w+$/gi))
            .filter((el: null) => el != null);
        this.dirFiles = trimPath.map(
            (item: any) => `'${this.options.publicPath || null}${item}'`,
        );
    }

    public writeStaticFiles(filesDir: string) {
        this.getDirFiles(filesDir);
        const files = this.dirFiles;
        const replaceBeacon = this.rawSWFile.replace(
            this.SEARCH_BEACON_STATIC,
            files,
        );
        fs.writeFileSync(this.swFile, replaceBeacon);
    }
}

const fillSW = new FillSW('../src/public/sw.js', {
    publicPath: '/img/',
});
fillSW.writeStaticFiles('../src/public/img/**/*');
