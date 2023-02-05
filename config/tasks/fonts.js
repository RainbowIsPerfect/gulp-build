import fonter from 'gulp-fonter';
import woff2 from 'gulp-ttf2woff2';

export const tottf = () => {
    return global.gulp.src(`${global.paths.fonts.src}*.otf`)
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(global.gulp.dest(global.paths.fonts.src))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(global.gulp.dest(global.paths.fonts.dest))
}

export const towoff2 = () => {
    return global.gulp.src(`${global.paths.fonts.src}*.ttf`)
        .pipe(woff2())
        .pipe(global.gulp.dest(global.paths.fonts.dest))
}