var gulp = require('gulp');
var minify = require('gulp-minify');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('html', function(){
  return gulp.src('app/**/*.pug')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(pug())
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
  return gulp.src('app/main.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function(){
  return gulp.src([
        'app/index.js'
    ])
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(concat('index.js'))
    .pipe(minify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('assets', function() {
    return gulp.src('assets/**')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    // Endless stream mode
    return watch([
        'app/**/*',
        'app/*',
        '!app/**/*.js',
        '!app/*.js'
    ], function (events, done) {
        gulp.start('other');
    })
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }));
});

gulp.task('watchjs', function () {
    // Endless stream mode
    return watch([
        'app/**/*.js',
        'app/*.js'
    ], function (events, done) {
        console.log('Run js compile');
        gulp.start('jsonly');
    })
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }));
});

gulp.task('other', [ 'html', 'css', 'assets' ]);
gulp.task('jsonly', [ 'js' ]);
gulp.task('default', [ 'html', 'css', 'js', 'assets' ]);

