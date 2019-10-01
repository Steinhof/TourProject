const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fibers = require('fibers');

// Settings
const cfg = require('./config/config');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: 'js/[name].js',
    },
    devServer: {
        hot: true,
    },
    watch: true,
    watchOptions: {
        ignored: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            experimentalFileCaching: true, // Cache results of previous operation
                            configFile: cfg.configs.ts.dev,
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
                                includePaths: ['./node_modules'],
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
            filename: 'index.html',
            template: cfg.files.template,
            // excludeChunks: ['server'], Dont want to be included in HTML
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
});
