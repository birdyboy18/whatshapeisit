'use strict';
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('browserify', function(){
  gulp.src('js/main.js')
    .pipe(browserify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./js/'));
});
gulp.task('watch',function(){
  gulp.watch('js/**/*.js',['browserify']);
});
