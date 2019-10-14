const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const Fibers = require('fibers');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Settings
const cfg = require('./config/config');

module.exports = {
    target: 'web',
    mode: 'development',
    context: __dirname,
    entry: {
        main: path.resolve(__dirname, cfg.files.ts),
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].js',
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.public.base),
    },
    watch: true,
    resolve: {
        extensions: ['.ts', '.js', '.css', '.sass'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
                include: path.resolve('src'),
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                implementation: require('sass'),
                                fiber: Fibers,
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: cfg.files.template,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3001,
            proxy: 'http://localhost:3000/',
            open: false,
            notify: false,
        }),
        new WebpackNotifierPlugin({
            excludeWarnings: false,
            sound: true,
            wait: true,
        }),
    ],
};
