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
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

var PATHS = {
    sass: ['css/*.scss'],
    allsass: ['css/**/*.scss'],
    jsALL: [
        'js/vendor/*.js',
        'js/main.js',
        'js/modules/*.js',
        'js/service/global.js',
        'js/service/filters.js',
        'html/**/*.js'],
    js: [
        'js/main.js',
        'js/modules/*.js',
        'js/service/global.js',
        'js/service/filters.js',
        'html/**/*.js'
    ],
    jsmin: ['js/main.min.js']
};

// Plumber error handler.
var onError = function(err) {
    gutil.beep();
    console.log(err);
    //this.emit('end');
};

// Definition for autoprefixer.
var AUTOPREFIXER_BROWSER = [
    'last 3 versions'
];

// Task SASS
gulp.task('sass', function() {
    return gulp.src(PATHS.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded'
        }))
        .on("error", notify.onError("SASS: <%= error.message %>"))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSER))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(reload({stream: true}));
});

// Task concatenate & minify JS
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
        .pipe(notify({message: 'CONCATENATE & Minify tasks complete'}));
});

gulp.task('js-watch',['js'], function(done) {
    browserSync.reload();
    done()
});

// Server
gulp.task('server', ['sass', 'js-watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // watches
    gulp.watch(PATHS.allsass, ['sass']);
    gulp.watch(PATHS.jsALL,['js-watch']);
    
});

// gulp Task
gulp.task('dev', ['server']);