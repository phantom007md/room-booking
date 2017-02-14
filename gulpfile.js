var gulp = require('gulp');
var b_sync = require('browser-sync').create();


gulp.task('default', function() {
  b_sync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./**/*.{html,css}', function() {
    gulp.src('./src/**/*.css').pipe(b_sync.stream());
    b_sync.reload();
  });
});
