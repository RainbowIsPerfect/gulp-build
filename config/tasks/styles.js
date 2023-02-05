import preSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import gulpCleanCss from 'gulp-clean-css';

const sass = gulpSass(preSass);

export const styles = () => {
    return global.gulp.src(global.paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(global.gulp.dest(global.paths.styles.dest))
        .pipe(gulpCleanCss({
            level: 2
        }))
        .pipe(global.plugins.rename(path => path.basename += ".min"))
        .pipe(global.gulp.dest(global.paths.styles.dest))
        .pipe(global.plugins.browserSync.stream())
}