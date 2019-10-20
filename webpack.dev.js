const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Fibers = require('fibers');

const threadLoader = require('thread-loader');

/* Pre warming, this boots the max number of workers in the pool */
threadLoader.warmup(
    {
        // pool options, like passed to loader options
        // must match loader options to boot the correct pool
    },
    [
        // modules to load
        // can be any module, i. e.
        'css-loader',
        'sass-loader',
    ],
);

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
                    // 'babel-loader', /* For IE11 development */
                ],
                include: path.resolve('src'),
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        // Performance depends on the project [see: https://blog.johnnyreilly.com/search?updated-max=2019-01-05T20:02:00Z&max-results=1&start=14&by-date=false ]
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    'style-loader',
                    'css-loader',
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
        new HtmlWebpackPlugin({
            template: cfg.files.template,
        }),
    ],
};
