const SRC_DIR = './src/client';
const BUILD_DIR = './src/public';

module.exports = {
    input: {
        mainFile: `${SRC_DIR}/modules/main.ts`,
    },
    output: {
        dest: `${BUILD_DIR}/js`,
    },
    watchSettings: {
        ignoreList: [
            `${BUILD_DIR}/js/*.js`,
            // `${BUILD_DIR}/modules/**/*.test.ts`,
            `${BUILD_DIR}/index.html`,
            'node_modules',
        ],
    },
    pluginsOptions: {
        htmlWebpackPlugin: {
            title: 'My Project',
            filename: `../index.html`, // Webpack looks for this file in pwd
            template: `${SRC_DIR}/templates/main.tpl.html`,
        },
    },
};
