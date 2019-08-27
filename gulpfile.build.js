const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const critical = require('critical').stream;
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const gulpWebpack = require('webpack-stream');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');

// Static server
gulp.task('BROWSER-SYNC', () => {
    browserSync.init({
        server: {
            baseDir: 'build',
        },
        notify: false,
    });
});

// CSS compiler
gulp.task('STYLES', () =>
    gulp
        .src('app/build/sass/main.sass')
        .pipe(
            plumber({
                errorHandler: notify.onError(err => ({
                    title: 'Sass error',
                    message: err.message,
                })),
            }),
        )
        .pipe(sass())
        .pipe(
            postcss([
                postcssPresetEnv({
                    stage: 0,
                    autoprefixer: { grid: 'autoplace' },
                    features: {
                        'nesting-rules': true,
                    },
                }),
            ]),
        )
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(
            purgecss({
                trim: true,
                shorten: true,
                content: ['app/build/index.html', 'app/build/js/main.min.js'],
                css: ['app/build/css/style.min.css'],
            }),
        )
        .pipe(gulp.dest('app/build/css'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        ),
);

// Webpack
gulp.task('TS', () =>
    gulp
        .src('src/modules/**/*.ts')
        .pipe(plumber())
        .pipe(gulpWebpack(require('./webpack.build.config.js')))
        .pipe(gulp.dest('app/build')),
);

// Image compress
gulp.task('IMAGEMIN', () =>
    gulp
        .src('build/img/*')
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
        .pipe(gulp.dest('build/img')),
);

// Generate & Inline Critical-path CSS
gulp.task('CRITICAL', () =>
    gulp
        .src('build/index.html')
        .pipe(
            critical({
                base: 'app/',
                inline: true,
                minify: true,
                dimensions: [
                    {
                        height: 375,
                        width: 812,
                    },
                ],
                css: 'build/css/style.min.css',
            }),
        )
        .pipe(gulp.dest('app/build')),
);

// TypeDoc
gulp.task('TYPEDOC', () =>
    gulp.src([settings.typedoc.files]).pipe(
        typedoc({
            module: 'commonjs',
            exclude: '**/node_modules/**/*.*',
            target: 'es5',
            includeDeclarations: true,
            // ignoreCompilerErrors: true,
            // experimentalDecorators: true,
            excludeExternals: true,
            version: true,
            out: settings.typedoc.options.out,
            name: settings.typedoc.options.name,
        }),
    ),
);

// Watcher
gulp.task('WATCH', () => {
    gulp.watch('build/sass', gulp.series('STYLES'));
    gulp.watch('build/modules').on('change', browserSync.reload);
    gulp.watch('build/index.html').on('change', browserSync.reload);
});

gulp.task(
    'default',
    gulp.series(
        gulp.parallel('STYLES'),
        gulp.parallel('WATCH', 'BROWSER-SYNC', 'TS'),
    ),
);
