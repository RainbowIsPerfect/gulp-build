import git from "gulp-git";

export const togit = () => {
    return global.gulp.src('src/', 'gulpfile.js', 'package.json', 'README.md', 'gitingnore', 'config/')
        .pipe(git.add())
        // .pipe(git.commit(`new commit`))
        // .on('end', function() {
        //     git.push('origin', 'master')
        // })
}