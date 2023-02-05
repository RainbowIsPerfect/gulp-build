import fileinclude from "gulp-file-include";
import webpHtml from "gulp-webp-html-nosvg"; 
import htmlpretty from "gulp-pretty-html";

export const html = () => {
    return global.gulp.src(global.paths.html.src)
        .pipe(fileinclude())
        .pipe(webpHtml())
        .pipe(htmlpretty())
        .pipe(global.gulp.dest(global.paths.html.dest))
        .pipe(global.plugins.browserSync.stream())
}