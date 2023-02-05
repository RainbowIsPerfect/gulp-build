export const localhost = () => {
    global.plugins.browserSync.init({
        server: {
            baseDir: global.paths.html.dest,
        },
        notify: false,
    })
}