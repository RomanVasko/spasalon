'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const minify = require('gulp-minify');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
// const minifyCSS = require('gulp-minify-css');

gulp.task('compile-less', function() {
    return gulp.src('./less/*.less')
        .pipe(less())
        // .pipe(concatCss("main.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('useref', function(){
    return gulp.src('./index.html')
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('./'))
});



gulp.task('compress', function() {
    gulp.src(['./js/main.js', './js/jquery-ui-timepicker-addon.js'])
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js'))
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'npm_gulp_grunt'
        },
    })
});

gulp.task('watch-less', gulp.series('browserSync'), function() {
    gulp.watch('./less/*.less' , gulp.series('compile-less'));
});
