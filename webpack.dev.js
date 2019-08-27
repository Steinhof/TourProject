const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// Settings
const settings = require('./config/wbpck.settings');

module.exports = {
    context: __dirname, // to automatically find tsconfig.json
    target: 'node',
    entry: {
        // '../sw': path.resolve(__dirname, 'src/modules/implementation/serviceWorker/sw.ts'),
        // 'js/ww': './src/modules/implementation/webWorkers/ww.ts',
        main: path.resolve(__dirname, settings.input.mainFile),
    },
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: '[name].js',
        publicPath: 'js/',
        path: path.resolve(__dirname, settings.output.dest), // Controlling by gulp
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: settings.watchSettings.ignoreList,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(
                                __dirname,
                                'node_modules/.cache/cache-loader',
                            ),
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            experimentalFileCaching: true, // Cache results of previous operation
                            configFile: './tsconfig.web.json',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: settings.pluginsOptions.htmlWebpackPlugin.filename,
            template: settings.pluginsOptions.htmlWebpackPlugin.template,
            // excludeChunks: ['server'], Dont want to be included in HTML
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async', // async, defer, type='module', preload, prefetch
        }),
        new WebpackNotifierPlugin({
            excludeWarnings: false,
            sound: true,
            wait: true,
        }),
    ],
    optimization: {
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
