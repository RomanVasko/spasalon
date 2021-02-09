'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const minifyCSS = require('gulp-minify-css');
const browserSync = require('browser-sync');

gulp.task('compile-less', function() {
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('useref', function(){
    return gulp.src('./index.html')
        .pipe(useref())
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('*.js', uglify()))
        // min all css
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulp.dest('./'))
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './'
            // directory: true
        },
    })
});

gulp.task('less', function() {
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', gulp.series('browserSync'), gulp.watch('./less/*.less' , gulp.series('less')));

