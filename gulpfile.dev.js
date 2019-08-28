const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cache = require('gulp-cached');
const webpack = require('webpack');

// File paths
const settings = require('./config/gulp.settings');

// Static server
gulp.task('BROWSER-SYNC', () => {
    browserSync.use(htmlInjector, {
        files: `${settings.browserSyncDir}/*.html`,
    });
    browserSync.init({
        server: {
            baseDir: settings.browserSyncDir,
        },
        notify: false, // Browser notification
        open: false, // Open project in a new tab?
        reloadDebounce: 300, // Wait 300 before .reload
    });
});

// CSS compiler
gulp.task('STYLES', () =>
    gulp
        .src(settings.styles.files)
        .pipe(sass())
        .on(
            'error',
            notify.onError({
                tittle: 'Sass error',
                message: '<%= error.message %>',
            }),
        )
        .pipe(cache('sass', { optimizeMemory: true }))
        .pipe(gulp.dest(settings.styles.dest))
        .pipe(browserSync.stream()),
);

// Webpack
gulp.task('WEBPACK', () => {
    webpack(require(settings.webpack.config), settings.webpack.errorHandler);
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

// Copying files to build folder
gulp.task('COPY', () => {
    gulp.src(settings.copy.files).pipe(gulp.dest(settings.copy.dest));
});

// Watcher
gulp.task('WATCH', () => {
    gulp.watch(
        settings.watch.sassFolder,
        { usePolling: true }, // Prevents compile time bug
        gulp.series('STYLES'),
    );
    // gulp.watch(settings.watch.modulesFolder).on('change', browserSync.reload);
    // gulp.watch(settings.wasm.input, gulp.series('WASM'));
    gulp.watch(settings.watch.indexFile, { usePolling: true }).on(
        'change',
        htmlInjector,
    );
});

gulp.task(
    'default',
    gulp.series(
        gulp.parallel(
            // 'START-SERVER',
            'BROWSER-SYNC',
            'STYLES',
            'WEBPACK',
            // 'WASM',
            'WATCH',
        ),
    ),
);
