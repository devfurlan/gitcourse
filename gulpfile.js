var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    include       = require('gulp-file-include'),
    clean         = require('gulp-clean'),
    autoprefixer  = require('gulp-autoprefixer'),
    uncss         = require('gulp-uncss'),
    imagemin      = require('gulp-imagemin'),
    browserSync   = require('browser-sync');

gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean())
})

gulp.task('copy', ['clean'], function(){
  gulp.src([
          'src/components/**/*',
          'src/css/**/*',
          'src/js/**/*'], {"base": "src"})
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function(){
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css/'));
})

gulp.task('html', function(){
  return gulp.src('./src/**/*.html')
    .pipe(include())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('uncss', ['html'], function(){
  return gulp.src('./dist/components/**/*.css')
        .pipe(uncss({
          html: ['./dist/*.html']
        }))
        .pipe(gulp.dest('./dist/components/'))
})

gulp.task('imagemin', function(){
  return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('server', ['uncss', 'imagemin'], function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
  gulp.watch('./dist/**/*').on('change', browserSync.reload)
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.html', ['html'])
})
