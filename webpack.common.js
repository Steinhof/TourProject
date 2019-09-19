const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

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
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    // Split vendor code to its own chunk(s)
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
};
