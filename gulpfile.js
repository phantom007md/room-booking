// var rollup = require('gulp-rollup');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var ugly = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var b_sync = require('browser-sync').create();
var jadi = require('gulp-jade');

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('jadee', function () {
  gulp.src('./src/**/*.jade')
  .pipe(jadi({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
})

gulp.task('compile-js', function() {
  var ts_opt = {
    outDir: './dist',
    target: 'ES5',
    module: 'es2015',
    outFile: './dist/ts/bookingroom.js'
  }
  return gulp.src('./src/**/*.ts')
    .pipe(ts(ts_opt))
    .pipe(gulp.dest('./'));
});

// gulp.task('concat', ['compile-js'], function() {
//   return gulp.src(['./src/assets/lib/dpLib/astro.js','./src/assets/lib/dpLib/calendar.js', './dist/ts/nvcPicker.js'])
//     .pipe(concat('nvcPicker.js'))
//     .pipe(gulp.dest('./dist/concat'));
// });

gulp.task('compress', ['compile-js'], function() {
  return gulp.src('./dist/ts/bookingroom.js')
    .pipe(ugly())
    .pipe(gulp.dest('./dist/ugly/'))
});

gulp.task('rename', ['compress'], function () {
  return gulp.src('./dist/ugly/bookingroom.js')
  .pipe(rename('bookingroom-min.js'))
  .pipe(gulp.dest("./build"))
  .pipe(b_sync.stream());
});



gulp.task('default', ['rename','jadee'], function() {
  b_sync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/**/*.jade', ['jadee']);
  gulp.watch('./src/**/*.ts', ['rename']);
  gulp.watch('./**/*.{html,css}', ['rename'], function() {
    gulp.src('./src/**/*.css').pipe(b_sync.stream());
    b_sync.reload();
  });
});


// gulp.task('bundle-js', ['compile-js'], function() {
//   var rollup_opt = {
//     entry: "./dist/modules/datepicker.js",
//   }
//   function onError(err) {
//     console.log(err);
//     this.emit('end');
//   }
//   return gulp.src('./dist/**/*.js')
//     .pipe(rollup(rollup_opt))
//     .on('error', onError)
//     .pipe(gulp.dest('./build'))
//     .pipe(b_sync.stream());
// });
