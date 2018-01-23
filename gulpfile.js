/*jshint strict:false */
/*jshint node:true */

var gulp = require('gulp'),
  del          = require('del'),
  watch        = require('gulp-watch'),
  sass         = require('gulp-ruby-sass'),
  usemin       = require('gulp-usemin'),
  uglify       = require('gulp-uglify'),
  minifyHtml   = require('gulp-minify-html'),
  minifyCss    = require('gulp-minify-css'),
  merge        = require('merge-stream'),
  plumber      = require('gulp-plumber'),
  browserSync =  require('browser-sync').create(),
  ngAnnotate   = require('gulp-ng-annotate'),
  reload       = browserSync.reload,
  replace      = require('gulp-replace'),
  filter       = require('gulp-filter'),
  postcss      = require('gulp-postcss'),
  sourcemaps   = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  ftp          = require('vinyl-ftp'),
  prompt       = require('gulp-prompt'),
  gutil        = require('gulp-util'),
  runSequence  = require('run-sequence');

// clean dist folder
gulp.task('clean:dist', function(cb) {
  return del(['./dist'], cb);
});


// sass and css

gulp.task('sass', function() {
  var cssfilter = filter('*.css', {restore:true});
  return sass('./app/assets/sass', {sourcemap: true})
    .on('error', sass.logError)

    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))

    //For inline sourcemaps
    .pipe(sourcemaps.write())


    // For file sourcemaps
    // .pipe(sourcemaps.write('maps', {
    //   includeContent: false,
    //   sourceRoot: 'source'
    // }))

    .pipe(gulp.dest('./app/assets/css'))

    .pipe(cssfilter)

    .pipe(browserSync.stream());
});


gulp.task('sass-build', function() {
  return sass('./app/assets/sass', {sourcemap: false, style:'compressed'})
    .on('error', sass.logError)

    // For inline sourcemaps
    // .pipe(sourcemaps.write())

    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))

    .pipe(gulp.dest('./dist/assets/css'));

});



//fonts
gulp.task('fonts', [], function() {
  gulp.src([
      './app/bower_components/bootstrap/dist/fonts/**/*',
      './app/bower_components/font-awesome/fonts/**/*'
    ])
    .pipe(gulp.dest('./app/assets/fonts'));
});

//copy modules
gulp.task('copy:modules', [], function() {
  gulp.src([
      './app/modules/**/i18n/*',
      './app/modules/**/templates/**/*',
      './app/modules/**/assets/img/**/*'
    ])
    .pipe(gulp.dest('./dist/modules'));
});

//copy core templates views
gulp.task('copy:core-templates', [], function() {
  gulp.src([
      './app/core/templates/*'
    ])
    .pipe(gulp.dest('./dist/core/templates'));
});

//copy data json
gulp.task('copy:json-data', [], function() {
  gulp.src([
      './app/modules/**/services/**/*.json'
    ])
    .pipe(gulp.dest('./dist/modules'));
});

//copy core data json
gulp.task('copy:json-core-data', [], function() {
  gulp.src([
      './app/core/data/**/*.json'
    ])
    .pipe(gulp.dest('./dist/core/data'));
});

//copy fonts
gulp.task('copy:fonts', [], function() {
  gulp.src([
      './app/assets/fonts/*'
    ])
    .pipe(gulp.dest('./dist/assets/fonts'));
});

//copy images
gulp.task('copy:images', [], function() {
  gulp.src([
      './app/assets/img/**/*'
    ])
    .pipe(gulp.dest('./dist/assets/img'));
});

//copy core/config
gulp.task('copy:core-config', [], function() {
  gulp.src([
      './app/core/config/*'
    ])
    .pipe(gulp.dest('dist/core/config'));
});

//copy core/config
gulp.task('copy:css', [], function() {
  gulp.src([
      './app/assets/css/design_system.css'
    ])
    .pipe(gulp.dest('dist/assets/css'));
});

//usemin
gulp.task('usemin', [], function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({
        empty: true
      })],
      vendorjs: [uglify({
        mangle: true
      })],
      appjs: [
        replace('debug: true', 'debug: false'),
        ngAnnotate({
          remove: true,
          add: true,
          single_quotes: true
        }),
        uglify({
          mangle: true
        })
      ]
    }))
    .pipe(gulp.dest('dist'));
});


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });
});

// run from the build folder
gulp.task('serve-build', [], function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});



// default task, same as serve
gulp.task('default', ['serve']);

// gulp serve task - runs the server, and watches for changes
gulp.task('serve', ['browser-sync', 'sass'], function() {
  gulp.watch(['./app/assets/sass/**/*.scss', './app/modules/**/*.scss'], ['sass']);
  gulp.watch(['./app/modules/**/*.js', './app/core/**/*.js', './app/**/*.html', '!./app/modules/i18n/**/*']).on('change', browserSync.reload);
});

//build
gulp.task('build', ['clean:dist'], function() {
  runSequence(
    'sass-build',
    'fonts',
    'usemin',
    'copy:modules',
    'copy:core-templates',
    'copy:json-data',
    'copy:json-core-data',
    'copy:images',
    'copy:fonts',
    'copy:core-config',
    'copy:css'
  );
});
