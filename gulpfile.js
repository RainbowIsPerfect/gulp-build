import gulp from "gulp";
import { paths } from "./config/paths.js";
import { plugins } from "./config/plugins.js";

// const git = require('gulp-git');
// const zip = require('gulp-zip');

global = {
	gulp: gulp,
    paths: paths,
    plugins: plugins,
}

import { clear } from "./config/tasks/clear.js";
import { html } from "./config/tasks/html.js";
import { styles } from "./config/tasks/styles.js"
import { img } from "./config/tasks/img.js";
import { scripts } from "./config/tasks/scripts.js";
import { localhost } from "./config/tasks/localhost.js";
import { tottf, towoff2 } from "./config/tasks/fonts.js";
import { togit } from "./config/tasks/git.js";

function watch() {
    gulp.watch(paths.styles.stylewatch, styles)
    gulp.watch(paths.html.htmlwatch, html)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
    gulp.watch(`${paths.fonts.src}*.otf`, tottf)
    gulp.watch(`${paths.fonts.src}*.ttf`, towoff2)
}

const build = gulp.series(clear, html, styles, scripts, tottf, towoff2, img, gulp.parallel(watch, localhost));
const git = gulp.series(togit);

export {build};
export {git};

// function zipDist() {
//     return gulp.src('dist/**/*.*')
//         .pipe(zip('archive.zip'))
//         .pipe(gulp.dest('./'))
// }



// exports.zipDist = zipDist;
// exports.clean = clean;
// exports.styles = styles;
// exports.scripts = scripts;
// exports.html = html;
// exports.img = img;
// exports.tottf = tottf;
// exports.towoff2 = towoff2;
// exports.towoff = towoff;
// exports.watch = watch;
// exports.togit = togit;
// exports.build = build;
// exports.default = build;