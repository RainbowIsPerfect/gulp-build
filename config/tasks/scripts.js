import uglify from "gulp-uglify";

export const scripts = () => {
    return global.gulp.src(global.paths.scripts.src)
        .pipe(uglify())
        .pipe(global.gulp.dest(global.paths.scripts.dest))
        .pipe(global.plugins.browserSync.stream())
}