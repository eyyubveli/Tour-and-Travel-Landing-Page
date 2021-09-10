const gulp = require('gulp');
const browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require("sass"));
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const prefix = require("gulp-autoprefixer");
const terser = require('gulp-terser');


gulp.task('serve', function () {

    browserSync.init({
        server: "./",
        notify: false,
    });

    gulp.watch("assets/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('assets/js/*.js', gulp.series('minifyjs'));
});


gulp.task('sass', function () {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('cleancss', function () {
    return gulp.src('assets/css/*.css')
        .pipe(cleancss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/css/'));

})

gulp.task('minifyhtml', function () {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./'))
})


gulp.task('minifyjs', function () {
    gulp.src('assets/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('assets/js/'));
})


gulp.task('default', gulp.series('serve', 'sass', 'cleancss', 'minifyhtml', 'minifyjs'));