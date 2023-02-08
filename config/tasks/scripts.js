import uglify from "gulp-uglify";
import babel from "gulp-babel";
import typescript from "gulp-typescript";
// import eslint from 'gulp-eslint';


export const js = () => {
    return global.gulp.src(global.paths.scripts.srcjs)
        // .pipe(eslint())
        // .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(global.gulp.dest(global.paths.scripts.dest))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(global.plugins.rename(path => path.basename += ".min"))
        .pipe(global.gulp.dest(global.paths.scripts.dest))
        .pipe(global.plugins.browserSync.stream())
}

export const ts = () => {
    const tsResult = global.gulp.src(global.paths.scripts.srcts)
        .pipe(typescript.createProject(global.paths.configs.ts)())
    return tsResult.js.pipe(global.gulp.dest(global.paths.scripts.src))
}