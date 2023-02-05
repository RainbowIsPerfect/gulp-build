import zip from 'gulp-zip';

export const zipDist = () => {
    return global.gulp.src('dist/**/*.*')
        .pipe(zip('archive.zip'))
        .pipe(global.gulp.dest('./'))
}