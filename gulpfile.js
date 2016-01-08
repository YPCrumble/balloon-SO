var gulp = require('gulp'),
    generateSourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify');

gulp.task('original', function() {
  var b = browserify({ entries: './index.js', debug: generateSourcemaps})
    .transform('babelify', {
        sourceMaps: generateSourcemaps,
        presets: ['babel-preset-es2015'],
        compact: false
    })
    .transform('browserify-shim')
  return b
  .bundle()
  .pipe(source('./indexOriginal.js'))
  .pipe(gulp.dest('./dist'))
})
.task('modified', function() {
  var b = browserify({ entries: './index.js'})
    .transform('babelify', {
        presets: ['babel-preset-es2015'],
        compact: false
    })
    .transform('browserify-shim')
  return b
  .bundle()
  .pipe(source('./indexModified.js'))
  .pipe(gulp.dest('./dist'))
})
.task('default', ['original', 'modified']);
