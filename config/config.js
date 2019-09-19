const fs = require('fs');

const getMainCssFile = fs.readdirSync('./src/public/css/');

const getJsFiles = fs.readdirSync('./src/public/js/');

// Export variables
module.exports = {
    paths: {
        src: {
            base: './src/',
        },
        dist: {
            base: './dist/',
        },
        public: {
            base: './src/public/',
            css: './src/public/css/',
            fonts: './src/public/fonts/',
            img: './src/public/img/',
            js: './src/public/js/',
        },
        client: {
            base: './src/client/',
            modules: './src/client/modules/',
            sass: './src/client/sass/',
            templates: './src/client/templates/',
        },
    },
    globs: {
        src: ['./src/**/*'],
        distCss: ['./src/public/css/*.css'],
        distJs: ['./src/public/js/*.js'],
        distSass: ['./src/client/sass/**/*.sass'],
        distModules: ['./src/client/modules/**/*'],
        html: ['./src/public/index.html'],
    },
    files: {
        html: './src/public/index.html',
        template: './src/client/templates/module.html',
        sass: './src/client/sass/main.sass',
        ts: './src/client/modules/main.ts',
        wasm: './src/client/modules/implementation/assembly/wasm.ts',
        sw: './src/client/modules/implementation/serviceWorker/sw.js',
        server: './src/server.ts',
        get: {
            css: getMainCssFile,
            js: getJsFiles,
        },
    },
    configs: {
        webpack: {
            dev: './webpack.dev.js',
            build: './webpack.build.js',
            sw: './webpack.sw.js',
        },
        ts: 'tsconfig.json',
    },
};
