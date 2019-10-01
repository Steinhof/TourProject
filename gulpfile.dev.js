const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');


/* File paths */
const cfg = require('./config/clean.js');

/* Notification handler */
const webpackLogger = require('./config/tasks/webpackLogger');

/* Delete old files */
gulp.task('CLEAN', () => {
    return del([cfg.globs.distCSS[0], cfg.globs.distJS[0]]);
});

/* Start server */
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
        watch: [cfg.paths.src.base],
        ignore: [cfg.paths.client.base],
        env: {
            NODE_ENV: 'development',
            NODE_OPTIONS: '--inspect', // load Node.Js profiler
        },
        scriptPosition: 4, // File name should be at the end
    }).on('start', () => {
        if (!started) {
            done();
            started = true;
        }
    });
    done();
});

/* Static server */
gulp.task('BROWSER-SYNC', done => {
    browserSync.init({
        proxy: 'http://localhost:3000', // Server address
        notify: false, // Browser notification
        open: false, // Open project in a new tab?
        reloadDebounce: 300, // Wait 300 before .reload
    });
    done();
});

/* Webpack */
gulp.task('WEBPACK', done => {
    webpack(require(cfg.configs.webpack.dev), webpackLogger);
    done();
});

// WASM
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

// Watcher
gulp.task('WATCH', () => {
    gulp.watch(cfg.globs.distJS).on('change', browserSync.reload);
    gulp.watch(cfg.globs.distCSS).on('change', browserSync.reload);
    // gulp.watch(settings.wasm.input, gulp.series('WASM'));
    gulp.watch(cfg.files.html, { usePolling: true }).on('change', htmlInjector);
});

gulp.task(
    'default',
    gulp.series('CLEAN', 'START-SERVER', 'BROWSER-SYNC', 'WEBPACK', 'WATCH'),
);
