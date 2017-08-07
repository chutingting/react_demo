var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var runSequence = require('run-sequence');

var DIST_WEB = './dist';

// build all the JavaScript things
gulp.task('build-browserify', function () {

    return browserify({ entries: './pages/app.jsx', debug: true })
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/build/'));
});

//gulp.task('concat-script', function () {
//    return gulp.src(['./components/*.jsx'])
//        .pipe(concat('main.jsx'))
//        .pipe(gulp.dest('./components/'))
//})

gulp.task('eslint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
            './components/**/*.js',
            '!node_modules/**',
            '!public/bower_components/**'
        ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('watch-build', function (done) {
    runSequence(
        ['build-browserify'], done);
});
gulp.task('watch', function () {
    gulp.watch(['./core/**/*.jsx',"./pages/**/*.jsx","./router/**/*.jsx"], ['watch-build']);
});

//gulp.task('copy', function () {
//
//    gulp.src('./components/**/*.*')
//        .pipe(gulp.dest(DIST_WEB)+"/public");
//
//    gulp.src('./package.json')
//        .pipe(gulp.dest(DIST_WEB));
//
//    gulp.src('./index.html')
//        .pipe(gulp.dest(DIST_WEB));
//});

gulp.task('build', function (done) {
    runSequence(
       ['build-browserify'],
        done);
});

gulp.task('default', ['build']);