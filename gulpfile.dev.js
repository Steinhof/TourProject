const gulp = require('gulp');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/* File paths */
const cfg = require('./config/config.js');

/* Webpack notification stats object */
const webpackLogger = require('./config/webpackLogger');
const webpackErrorHandler = require('./config/webpackErrorHandler');

// -----------------------------------------------------------------------------
// DELETE OLD FILES
// -----------------------------------------------------------------------------
gulp.task('CLEAN', () => {
    return del([cfg.globs.distCSS[0], cfg.globs.distJS[0]]);
});

// -----------------------------------------------------------------------------
// NODE WEBPACK SERVER
// -----------------------------------------------------------------------------
gulp.task('START-SERVER', done => {
    webpack(require(cfg.configs.webpack.node), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// WEBPACK
// -----------------------------------------------------------------------------
gulp.task('WEBPACK', done => {
    const compiler = webpack(require(cfg.configs.webpack.dev));
    new WebpackDevServer(compiler, {
        stats: webpackLogger,
        overlay: true,
        hot: true,
        contentBase: path.join(__dirname, cfg.paths.src.base),
        watchContentBase: true,
        /* See [How to tell webpack dev server to serve index.html for any route (https://stackoverflow.com/q/31945763] */
        historyApiFallback: true,
        // writeToDisk: true,
        // headers: { /* For CORS */
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': '*',
        // },
        proxy: {
            /* Relocate server to proxy */
            context: ['/'],
            target: 'http://localhost:3000',
        },
        port: 3001,
    }).listen(3001);
    done();
});

// -----------------------------------------------------------------------------
// WASM
// -----------------------------------------------------------------------------
// gulp.task('WASM', done => {
//     const asc = require('assemblyscript/cli/asc');
//     asc.main(
//         [
//             settings.wasm.input,
//             '--binaryFile',
//             settings.wasm.output,
//             '--optimize',
//         ],
//         {
//             stdout: process.stdout,
//             stderr: process.stderr,
//         },
//         err => {
//             if (err) throw err;
//         },
//     );
//     done();
// });

// -----------------------------------------------------------------------------
// GULP START
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series('CLEAN', 'START-SERVER', 'WEBPACK'));
