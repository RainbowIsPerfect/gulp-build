const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();


const paths = {
    styles: {
        src: 'src/styles/style.scss',
        stylewatch: 'src/styles/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/**',
        dest: 'dist/img'
    },
    html: {
        src: 'src/**/*.html',
        dest: 'dist'
    }
}

function del() {
    return gulp.src('dist/**/', {read: false})
        .pipe(clean());
}

function delincludes() {
    return gulp.src('dist/includes/**/', {read: false})
        .pipe(clean());
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function img() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })
    gulp.watch(paths.html.dest).on('change', browserSync.reload)
    gulp.watch(paths.styles.stylewatch, styles)
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
}

const build = gulp.series(del, html, gulp.parallel(styles, scripts, img), delincludes, watch)

exports.del = del;
exports.delincludes = delincludes;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.img = img;
exports.watch = watch;
exports.build = build;
exports.default = build;