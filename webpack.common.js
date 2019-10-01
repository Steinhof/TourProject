const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const getPackageNameFromPath = require('./config/getPackageNameFromPath');

// Settings
const cfg = require('./config/config');

module.exports = {
    context: __dirname,
    target: 'web',
    entry: {
        main: path.resolve(__dirname, cfg.files.ts),
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.public.base),
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.sass'],
    },
    plugins: [
        new WebpackNotifierPlugin({
            excludeWarnings: false,
            sound: true,
            wait: true,
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxInitialRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /\/node_modules\//,
                    name(module, chunks) {
                        const packageName = getPackageNameFromPath(
                            module.context,
                        ).replace('/', '-');
                        return `${packageName}~${chunks
                            .map(chunk => chunk.name)
                            .join('~')}`;
                    },
                },
            },
        },
    },
};
