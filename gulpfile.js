import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import gulpSass from 'gulp-sass'
import nodeSass from 'sass'
const sass = gulpSass(nodeSass)
import concat from 'gulp-concat'

/**
 * TOP LEVEL FUNCTIONS
 * gulp.task - Define tasks
 * gulp.src - Point to files to use
 * gulp.dest - Point to folder to output
 * gulp.watch - watch files and folders for changes
 */

gulp.task('message', () => {
  return console.log('Gulp is running...');
})

// copy html
gulp.task('copyHtml', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

// optimize images
gulp.task('imageMin', () => {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

// minify js
gulp.task('minify', () => {
  gulp.src('src/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// compile sass
gulp.task('sass', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})

// scripts
gulp.task('scripts', () => {
  gulp.src('src/js/*')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('default', gulp.parallel('message', 'copyHtml', 'imageMin', 'sass', 'scripts'))

gulp.task('watch', () => {
  gulp.watch('src/js/*.js', gulp.series('scripts'))
  gulp.watch('src/img/*', gulp.series('imageMin'))
  gulp.watch('src/sass/*.scss', gulp.series('sass'))
  gulp.watch('src/*.html', gulp.series('copyHtml'))
})
