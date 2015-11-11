'use strict';

// Access Gulp
var gulp = require('gulp'),

    //css
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),

    //js
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),

    //others
    del = require('del'),
    util = require('gulp-util'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

// Gulp plumber error handler
var onError = function(err) {
    console.log(err);
}

// Set-Up Task 
gulp.task('sass', function() {
    return gulp.src('css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({  sourcemap: true, style: 'expanded' }))
        .on("error", notify.onError("SASS: <%= error.message %>"))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css/'))
        .pipe(sourcemaps.write())
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function(){
    return gulp.src([
            'js/vendor/*.js',
            'js/main.js', 
            'js/modules/*.js', 
            'js/service/global.js',
            'js/service/filters.js',
            'html/**/*.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js',{newLine: ';'}))
        .pipe(ngAnnotate({add:true}))
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('jshint', function() {
  return gulp.src(['js/main.js','js/service/*.js','html/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(){
    del(['js/main.min.js']);
});

// Watch Task
gulp.task('watch', function(){

    gulp.watch('css/**/*.scss',['sass']);
    gulp.watch('Gulpfile.js',['js']);
    gulp.watch('js/main.js',['js']);
    gulp.watch('js/service/*.js',['js']);
    gulp.watch('html/**/*.js',['js']);
    gulp.watch('js/**/*.js', ['jshint']);
    gulp.watch('js/*.js', ['jshint']);

});

// gulp Task
gulp.task('default', ['clean','watch','sass','js']);