const SRC_DIR = './src/client';
const BUILD_DIR = './src/public';

module.exports = {
    browserSyncDir: `${BUILD_DIR}`, // Host static dir
    lint: {
        files: `${SRC_DIR}/sass/**/*.sass`,
        dest: `${SRC_DIR}/sass`,
    },
    styles: {
        files: `${SRC_DIR}/sass/main.sass`,
        dest: `${BUILD_DIR}/css`,
    },
    webpack: {
        files: `${SRC_DIR}/modules/**/*.ts`,
        config: './webpack.dev.js',
        dest: `${BUILD_DIR}/js`,
        errorHandler(err, stats) {
            // Stats Object
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }
            // Result (you can choose stats preset)
            console.log(`Webpack finished:`, stats.toString('minimal'));
        },
    },
    wasm: {
        input: `${SRC_DIR}/modules/implementation/assembly/wasm.ts`,
        output: `${BUILD_DIR}/js/wasm.wasm`,
    },
    copy: {
        files: `./src/**`,
        dest: './build/',
    },
    typedoc: {
        files: `${SRC_DIR}/**/*.ts`,
        options: {
            name: 'My project',
            out: './docs',
        },
    },
    watch: {
        sassFolder: `${SRC_DIR}/sass/`,
        modulesFolder: [
            `${SRC_DIR}/modules/`,
            `!${SRC_DIR}/modules/**/*.test.ts`, // ! to ignore test files
        ],
        indexFile: `${BUILD_DIR}/index.html`,
    },
};
