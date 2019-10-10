const gulp = require('gulp');
const path = require('path');
const del = require('del');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');
const WebpackDevServer = require('webpack-dev-server');

/* File paths */
const cfg = require('./config/config.js');

/* Webpack notification stats object */
const webpackLogger = require('./config/webpackLogger');

// -----------------------------------------------------------------------------
// DELETE OLD FILES
// -----------------------------------------------------------------------------
gulp.task('CLEAN', () => {
    return del([cfg.globs.distCSS[0], cfg.globs.distJS[0]]);
});

// -----------------------------------------------------------------------------
// NODEMON SERVER
// -----------------------------------------------------------------------------
gulp.task('START-SERVER', done => {
    let started = false;
    nodemon({
        script: cfg.files.server,
        ext: 'ts',
        args: [
            '--transpile-only',
            '--pretty',
            '--project',
            'tsconfig.node.json',
        ],
        watch: ['./src'],
        ignore: ['node_modules/', cfg.paths.public.base, cfg.paths.client.base],
        env: {
            NODE_ENV: 'development',
            NODE_OPTIONS: '--inspect',
        },
        scriptPosition: 4, // File name should be at the end
    }).on('start', () => {
        // to prevent double start
        if (!started) {
            done();
            started = true;
        }
    });
    done();
});

// -----------------------------------------------------------------------------
// WEBPACK DEV SERVER
// -----------------------------------------------------------------------------
gulp.task('WEBPACK', done => {
    const compiler = webpack(require(cfg.configs.webpack.dev));
    new WebpackDevServer(compiler, {
        stats: webpackLogger,
        hot: true,
        contentBase: path.join(__dirname, cfg.paths.public.base),
        watchContentBase: true,
        // writeToDisk: true,
        // headers: { //For CORS
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': '*',
        // },
        proxy: {
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
