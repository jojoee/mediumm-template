var gulp          = require('gulp');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var pug           = require('gulp-pug');
var clean         = require('gulp-clean');
var gulpif        = require('gulp-if');

var enabled = {
  map: false
};

/*================================================================
 # HELPER
 ================================================================*/

function handleError(err) {
  var msg = 'Error: ' + err.message;

  console.error('Error', err.message);
  browserSync.notify('Error: ' + err.message);

  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  if (typeof this.emit === 'function') this.emit('end')
}

/*================================================================
 # TASK
 ================================================================*/

gulp.task('clean', function(){
  return gulp.src([
      './html/*',
      './css/*'
    ], {
      read: false
    })
    .pipe(clean());
});

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    .pipe(gulpif(enabled.map, sourcemaps.init()))
    .pipe(sass({
      'sourceComments': false,
      'outputStyle': 'expanded'
    })).on('error', handleError)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(enabled.map, sourcemaps.write('.')))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('./pug/*.pug')
    .pipe(pug({
      basedir: './pug/includes/var.pug',
      pretty: true
    })).on('error', handleError)
    .pipe(gulp.dest('./html/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: './',
    open: true,
  });

  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./js/*.js', { interval: 500 }).on('change', browserSync.reload);
  gulp.watch('./pug/**/*.pug', ['pug']);
});

gulp.task('build', ['pug', 'sass']);
gulp.task('watch', ['serve']);
gulp.task('default', ['build']);
