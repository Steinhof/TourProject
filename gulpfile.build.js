const gulp = require('gulp');
const del = require('del');
const typedoc = require('gulp-typedoc');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');
const SWInjectFiles = require('./config/SWInjectFiles');

/* File paths */
const cfg = require('./config/config');

/* Webpack error handler */
const webpackErrorHandler = require('./config/webpackErrorHandler');

// -----------------------------------------------------------------------------
// DELETE OLD FILES
// -----------------------------------------------------------------------------
gulp.task('CLEAN', done => {
    del([cfg.globs.distCSS[0], cfg.globs.distJS[0]]);
    done();
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
        ignore: ['node_modules/'],
        env: {
            NODE_ENV: 'production',
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

// -----------------------------------------------------------------------------
// WEBPACK
// -----------------------------------------------------------------------------
gulp.task('WEBPACK', done => {
    webpack(require(cfg.configs.webpack.build), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// SERVICE WORKER
// -----------------------------------------------------------------------------
gulp.task('SW', done => {
    webpack(require(cfg.configs.webpack.sw), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// INJECT CACHE FILES TO SW
// -----------------------------------------------------------------------------
gulp.task('SWFILES', done => {
    const fillSW = new SWInjectFiles('./src/public/sw.js', {
        ignorePath: './src/public',
    });

    fillSW.writeStaticFiles([
        './src/public/img/**/*',
        './src/public/js/*',
        './src/public/css/*',
        './src/public/index.html',
    ]);
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
// IMAGE COMPRESSION
// -----------------------------------------------------------------------------
gulp.task('IMAGEMIN', () =>
    gulp
        .src(cfg.paths.public.img)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ]),
        )
        .pipe(gulp.dest(cfg.paths.public.img)),
);

// -----------------------------------------------------------------------------
// TYPEDOC
// -----------------------------------------------------------------------------
gulp.task('TYPEDOC', () =>
    gulp.src(cfg.globs.distModules).pipe(
        typedoc({
            module: 'commonjs',
            exclude: '/node_modules/',
            target: 'es5',
            includeDeclarations: true,
            ignoreCompilerErrors: true,
            experimentalDecorators: true,
            excludeExternals: true,
            version: true,
            out: './',
            name: 'My project',
        }),
    ),
);

// -----------------------------------------------------------------------------
// GULP START
// -----------------------------------------------------------------------------
gulp.task(
    'default',
    gulp.series(
        'CLEAN',
        'IMAGEMIN',
        'WEBPACK',
        'SW',
        'START-SERVER',
        'SWFILES',
    ),
);
