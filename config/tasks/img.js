import newer from "gulp-newer";
import webp from 'gulp-webp';
import imagemin from "gulp-imagemin";

export const img = () => {
    return global.gulp.src(global.paths.images.src)
        .pipe(newer(global.paths.images.dest))
        .pipe(webp())
        .pipe(global.gulp.dest(global.paths.images.dest))
        .pipe(global.gulp.src(global.paths.images.src))
        .pipe(newer(global.paths.images.dest))
        .pipe(imagemin())
        .pipe(global.gulp.dest(global.paths.images.dest))
}