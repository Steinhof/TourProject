const gulp = require('gulp');
const ts = require('gulp-typescript');

/* File paths */
const cfg = require('./config/config');

/* Tsconfig for node.js */
const tsProject = ts.createProject(cfg.configs.ts.node);

/* Compile ts server to dist */
gulp.task('TSDIST', done => {
    const tsResult = gulp.src(cfg.globs.distTsServer).pipe(tsProject());
    tsResult.js.pipe(gulp.dest(cfg.paths.dist.base));
    done();
});

/* Copy files to dist/public folder */
gulp.task('COPY', done => {
    gulp.src(cfg.globs.public).pipe(gulp.dest(cfg.paths.dist.public));
    done();
});

gulp.task('default', gulp.series('COPY', 'TSDIST'));
