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
    sass: ['app/css/*.scss'],
    allHTML: ['app/*.html', 'app/html/**/*.html'],
    allsass: ['app/css/**/*.scss'],
    jsALL: ['app/js/vendor/*.js','app/js/main.js','app/js/modules/*.js','app/js/service/global.js','app/js/service/filters.js','app/html/**/*.js'],
    hintFiles: ['app/js/main.js','app/js/service/global.js','app/js/service/filters.js','app/html/**/*.js'],
    jsmin: ['app/js/main.min.js']
};

// Plumber error handler.
var onError = function(err) {
    gutil.beep();
    console.log(err);
    //this.emit('end');
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

// Task Just CONCAT
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

// Run Tasks
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });

    // watch sass + HTML injection.
    gulp.watch(PATHS.allsass, ['sass']);
    gulp.watch(PATHS.allHTML).on('change', reload);
    
});

gulp.task('watchJS', function() {
    gulp.watch(PATHS.jsALL,['concate']);
    gulp.watch(PATHS.hintFiles,['jshint']);
});

gulp.task('dev', ['clean', 'sass', 'jshint', 'concate'], function() {
    gulp.watch(PATHS.allsass,['sass']);
    gulp.watch(PATHS.jsALL,['concate']);
    gulp.watch(PATHS.hintFiles,['jshint']);
});

gulp.task('prod', ['clean', 'sass', 'js'], function() {
    gulp.watch(PATHS.allsass,['sass']);
    gulp.watch(PATHS.jsALL,['js']);
});