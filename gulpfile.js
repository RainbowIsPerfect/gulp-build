const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const webpHtml = require('gulp-webp-html-nosvg');
// const fonter = require('gulp-fonter');
const woff = require('gulp-ttf2woff');
const woff2 = require('gulp-ttf2woff2');
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
        dest: 'dist/img/'
    },
    html: {
        src: 'src/*.html',
        htmlwatch: 'src/**/*.html',
        dest: 'dist'
    },
    fonts: {
        src: 'src/fonts/*.ttf',
        dest: 'dist/fonts/',
    }
}


function clean() {
    return del(['dist/*', '!dist/img', '!dist/fonts'])
}

function towoff() {
    return gulp.src(paths.fonts.src)
        .pipe(newer(paths.images.dest))
        .pipe(woff())
        .pipe(gulp.dest(paths.fonts.dest))
}

function towoff2() {
    return gulp.src(paths.fonts.src)
        .pipe(newer(paths.images.dest))
        .pipe(woff2())
        .pipe(gulp.dest(paths.fonts.dest))
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix({
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function img() {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(webp())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(gulp.src(paths.images.src))
        .pipe(newer(paths.images.dest))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream())
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(fileinclude())
        .pipe(webpHtml())
        // .pipe(htmlmin({ collapseWhitespace: true }))
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
    gulp.watch(paths.html.htmlwatch, html)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
    gulp.watch(paths.fonts.src, towoff)
    gulp.watch(paths.fonts.src, towoff2)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), towoff, towoff2, watch)

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.img = img;
exports.towoff2 = woff2;
exports.towoff = towoff;
exports.watch = watch;
exports.build = build;
exports.default = build;