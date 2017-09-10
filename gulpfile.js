var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');


// Set your full base url's here
var devUrl = 'localhost:8888/standardPipes/'; 
var fileUrl = 'sites/all/themes/sproutChild/'


// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    proxy: devUrl
    })
})

gulp.task('sass', function() {
  return gulp.src(fileUrl + 'sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest(fileUrl + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// css minify
gulp.task('minify', function(){
	gulp.src(fileUrl + 'css/**/*.css')
	    .pipe(minifyCSS())
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	    .pipe(concat('style.min.css'))
	    .pipe(gulp.dest(fileUrl + 'css'))
});

gulp.task('watch', ['browserSync'], function (){
  gulp.watch(fileUrl + 'sass/**/*.scss', ['sass','minify']).on('change', browserSync.reload);
  // Other watchers
  gulp.watch(fileUrl + '*.html', browserSync.reload);
  gulp.watch(fileUrl + '*.php', browserSync.reload);
  gulp.watch(fileUrl + 'js/**/*.js', browserSync.reload);
})