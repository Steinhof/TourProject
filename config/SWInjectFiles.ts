const fs = require('fs');
const glob = require('glob');

// Use 'BEACON-STATIC' for static files or 'BEACON-MUTABLE' for mutable files

interface Options {
    publicPath?: string;
    ignorePath: string | RegExp;
}

class SWInjectFiles {
    public swFile: string;

    private rawSWFile: string;

    public options: Options;

    private dirFiles: string | string[];

    readonly SEARCH_BEACON_VERSION: RegExp = /.BEACON-VERSION./gi;

    readonly SEARCH_BEACON_STATIC: RegExp = /.BEACON-STATIC./gi;

    readonly SEARCH_BEACON_MUTABLE: RegExp = /.BEACON-MUTABLE./gi;

    constructor(swFile: string, options: Options) {
        this.swFile = swFile; // Initialize Service worker file
        this.options = options;
        this.readSWFile();
    }

    private readSWFile(): void {
        const readFile = fs.readFileSync(this.swFile);
        this.rawSWFile = readFile.toString();
    }

    private getDirFiles(dir: string | string[]): void {
        const globsArr = Array.isArray(dir) ? dir : [dir];

        let fileNames: string[] = ['/'];

        globsArr.forEach((item: string) => {
            fileNames.push(
                ...glob.sync(item, {
                    nodir: true,
                }),
            );
        });

        if (this.options.ignorePath) {
            fileNames = fileNames
                .map((item: string) =>
                    item.replace(new RegExp(this.options.ignorePath, 'gi'), ''),
                )
                .filter((el: string | null) => el !== null);
        } else if (this.options.publicPath) {
            fileNames = fileNames
                .map((item: any) => item.match(/[\w\d-_.]+\.\w+$/gi))
                .reduce((acc, val) => acc.concat(val), [])
                .filter((el: any) => el !== null);
        }

        this.dirFiles = fileNames.map(
            (item: string) => `'${this.options.publicPath || ''}${item}'`,
        );
    }

    public writeStaticFiles(filesDir: string | string[]): void {
        this.getDirFiles(filesDir);

        const files = this.dirFiles;
        const replaceBeacon = this.rawSWFile.replace(
            this.SEARCH_BEACON_STATIC,
            files as string,
        );
        const newFileVersion = replaceBeacon.replace(
            this.SEARCH_BEACON_VERSION,
            `'${Math.random()}'`,
        );
        fs.writeFileSync(this.swFile, newFileVersion);
        console.log('Injection of static files complete');
    }

    public writeMutableFiles(filesDir: string | string[]): void {
        this.getDirFiles(filesDir);

        const files = this.dirFiles;
        const replaceBeacon = this.rawSWFile.replace(
            this.SEARCH_BEACON_MUTABLE,
            files as string,
        );
        const newFileVersion = replaceBeacon.replace(
            this.SEARCH_BEACON_VERSION,
            `'${Math.random()}'`,
        );
        fs.writeFileSync(this.swFile, newFileVersion);
        console.log('Injection of mutable files complete');
    }
}

module.exports = SWInjectFiles;
