var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglifyJs = require('gulp-uglify');
var jshint = require('gulp-jshint');

// Set your full base url's here
var devUrl = 'localhost:8888/standardPipes/'; 
var projectFilesLocation = './app/';

var assetDistributionFolder = projectFilesLocation + 'assets';


// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    proxy: devUrl
    })
})

gulp.task('sass', function() {
  return gulp.src(projectFilesLocation + 'scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(projectFilesLocation + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

// css minify
gulp.task('minify', function(){
	gulp.src(projectFilesLocation + 'css/**/*.css')
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	    .pipe(concat('style.min.css'))
      .pipe(minifyCSS())
	    .pipe(gulp.dest(assetDistributionFolder))
});

gulp.task('js', function(){
  gulp.src(projectFilesLocation + 'js/**/*.js')
    .pipe(jshint())
    // don't forget to npm the jshint-stylish
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.min.js'))
    .pipe(uglifyJs())
    .pipe(gulp.dest(assetDistributionFolder));
});

gulp.task('watch', function (){
  gulp.watch(projectFilesLocation + 'scss/**/*.scss', ['sass','minify']).on('change', browserSync.reload);
  // Other watchers
  gulp.watch(projectFilesLocation + '*.html', browserSync.reload);
  gulp.watch(projectFilesLocation + '*.php', browserSync.reload);
  gulp.watch(projectFilesLocation + 'js/**/*.js', ['js']).on('change', browserSync.reload);
})

gulp.task('default', ['sass', 'minify', 'js', 'watch']);