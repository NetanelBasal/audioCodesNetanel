var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('less', function() {
  return gulp.src('./less/main.less')
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 5 versions'],
      cascade : false
    }))
    //.pipe($.minifyCss())
    .pipe(gulp.dest('./css'))
    .pipe(reload({ stream: true }));
});

gulp.task('serve', ['less'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("less/**/*.less", ['less']);
  gulp.watch(["./*.html","./partials/*.html", "./*.js"]).on('change', reload);
});

gulp.task('default', ['serve']);