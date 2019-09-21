const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fibers = require('fibers');

// Settings
const cfg = require('./config/config');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js',
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
                            experimentalFileCaching: true, // Cache results of previous operation
                            configFile: cfg.configs.ts.build,
                        },
                    },
                    'babel-loader',
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['./node_modules'],
                                implementation: require('sass'),
                                fiber: Fibers,
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: cfg.files.template,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ScriptExtHtmlWebpackPlugin({
            preload: 'runtime', // async, defer, type='module', preload, prefetch, module
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
});
