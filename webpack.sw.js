const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

// Settings
const cfg = require('./config/config');

module.exports = {
    context: __dirname,
    target: 'web',
    entry: {
        sw: path.resolve(__dirname, cfg.files.sw),
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, cfg.paths.public.base),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['cache-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new WebpackNotifierPlugin({
            excludeWarnings: false,
            sound: true,
            wait: true,
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
};
