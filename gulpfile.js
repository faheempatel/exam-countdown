var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var recess = require('gulp-recess');

var paths = {
    main: ['www/static/js/main.js']
  , mainMin: ['www/static/js/main.min.js']
  , concat: [
      'www/static/js/lib/*'
    , 'www/static/js/main.min.js'
  ]
  , stylesheets: [
      'www/static/css/*'
    , '!www/static/css/style.min.css'
  ]
};

gulp.task('uglify', function() {
  return gulp.src(paths.main)
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('www/static/js/'));
}); 
gulp.task('concat', function() {
  return gulp.src(paths.concat)
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('www/static/js/'));
});

gulp.task('stylesheets', function() {
  return gulp.src(paths.stylesheets)
  .pipe(recess({ noIDs: false }))
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('www/static/css/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.main, ['uglify']);
  gulp.watch(paths.mainMin, ['concat']);
  gulp.watch(paths.stylesheets, ['stylesheets']);
});

gulp.task('default', ['uglify', 'concat', 'stylesheets', 'watch']);
