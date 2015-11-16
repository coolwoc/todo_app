'use strict';

// Access Gulp
var gulp = require('gulp'),

    // browsersync
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

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
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

var PATHS = {
    sass: ['css/*.scss'],
    allsass: ['css/**/*.scss'],
    jsALL: ['js/vendor/*.js','js/main.js','js/modules/*.js','js/service/global.js','js/service/filters.js','html/**/*.js'],
    hintFiles: [ 'js/main.js','js/service/global.js','js/service/filters.js','html/**/*.js'],
    jsmin: ['js/main.min.js']
};

// Plumber error handler.
var onError = function(err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

// Definition for autoprefixer.
var AUTOPREFIXER_BROWSER = [
    'last 3 versions',
    'ie >= 8 ',
    'safari 5',
    'opera 12.1',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Task SASS
gulp.task('sass', function() {
    return gulp.src(PATHS.sass)
        .pipe(plumber({ errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass({  sourcemap: true, style: 'expanded' }))
        .on("error", notify.onError("SASS: <%= error.message %>"))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSER))
        .pipe(gulp.dest('css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css/'))
        .pipe(reload({stream: true}))
        .pipe(sourcemaps.write())
        .pipe(notify({ message: 'Styles task complete' }));
});

// Task JSHINT
gulp.task('jshint', function() {
  return gulp.src(PATHS.hintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'JSHINT task compteted'}));
});

// Task MINIFY + CONCATENATE
gulp.task('js', function(){
    return gulp.src(PATHS.jsALL)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js',{newLine: ';'}))
        .pipe(ngAnnotate({add:true}))
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'MINIFY & CONCATENATE tasks complete'}));
});

// Task CONCAT
gulp.task('concate', function() { 
    return gulp.src(PATHS.jsALL)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js',{newLine:';'}))
        .pipe(ngAnnotate({add:true}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'CONCATENATE task complete'}));
});

gulp.task('clean', function(){
    del(PATHS.jsmin);
});

// Watch Task
gulp.task('watch', function(){

    gulp.watch(PATHS.allsass,['sass']);
    //gulp.watch(PATHS.jsALL,['js']);
    gulp.watch(PATHS.jsALL,['concate']);
    gulp.watch(PATHS.hintFiles,['jshint']);

});

// Server
gulp.task('server', ['sass', 'concate'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // sass
    gulp.watch(PATHS.allsass, ['sass']);
});

// gulp Task
gulp.task('dev', ['clean','jshint','watch','sass','concate']);
gulp.task('prod', ['clean','sass','js']);

gulp.task('default',['server']);


