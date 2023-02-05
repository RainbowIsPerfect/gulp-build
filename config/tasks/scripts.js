import uglify from "gulp-uglify";

export const scripts = () => {
    return global.gulp.src(global.paths.scripts.src)
        .pipe(global.gulp.dest(global.paths.scripts.dest))
        .pipe(uglify())
        .pipe(global.plugins.rename(path => path.basename += ".min"))
        .pipe(global.gulp.dest(global.paths.scripts.dest))
        .pipe(global.plugins.browserSync.stream())
}