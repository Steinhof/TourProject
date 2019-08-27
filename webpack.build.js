const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    context: __dirname,
    target: 'web',
    entry: {
        'js/wasm/wasm': './dist/modules/implementation/assembly/wasm.ts',
        // sw: './dist/modules/implementation/serviceWorker/sw.ts',
        // 'js/ww': './dist/modules/implementation/webWorkers/ww.ts',
        'js/main': './dist/modules/main.ts',
    },
    mode: 'production',
    output: {
        filename: '[name].[contentHash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                        },
                    },
                    { loader: 'babel-loader' },
                ],
                exclude: [/node_modules/, /assembly/],
            },
            {
                loader: 'assemblyscript-typescript-loader',
                include: /assembly/,
                options: {
                    name: `[name].wasm`,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            useTypescriptIncrementalApi: true,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];
                        return `npm.${packageName.replace('@', '')}`;
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
