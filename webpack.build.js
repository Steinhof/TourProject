const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fibers = require('fibers');
const WebpackNotifierPlugin = require('webpack-notifier');
const CriticalCssPlugin = require('critical-css-webpack-plugin');

// Settings
const cfg = require('./config/config');
const getPackageNameFromPath = require('./config/getPackageNameFromPath');

module.exports = {
    mode: 'production',
    context: __dirname,
    target: 'web',
    entry: {
        main: path.resolve(__dirname, cfg.files.ts),
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.public.base),
        // libraryTarget: 'commonjs2', // To make the library compatible with other environments
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.sass'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['cache-loader', 'babel-loader'],
                include: path.resolve('src'),
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
                    'group-css-media-queries-loader',
                    {
                        loader: 'sass-loader',
                        options: {
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
        new CriticalCssPlugin({
            base: cfg.paths.public.base,
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            dimensions: [
                {
                    width: cfg.criticalCssConfig.criticalWidthDesktop,
                    height: cfg.criticalCssConfig.criticalHeightDesktop,
                },
                {
                    width: cfg.criticalCssConfig.criticalWidthMobile,
                    height: cfg.criticalCssConfig.criticalHeightMobile,
                },
            ],
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
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
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
};
