import gulp from "gulp";
import { paths } from "./config/paths.js";
import { plugins } from "./config/plugins.js";

global = {
	gulp: gulp,
    paths: paths,
    plugins: plugins,
}

import { clear, fullClear } from "./config/tasks/clear.js";
import { html } from "./config/tasks/html.js";
import { styles } from "./config/tasks/styles.js"
import { img } from "./config/tasks/img.js";
import { scripts } from "./config/tasks/scripts.js";
import { localhost } from "./config/tasks/localhost.js";
import { tottf, towoff2 } from "./config/tasks/fonts.js";
import { togit } from "./config/tasks/git.js";
import { zipDist } from "./config/tasks/zip.js";

const watch = () => {
    gulp.watch(paths.styles.stylewatch, styles)
    gulp.watch(paths.html.htmlwatch, html)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
    gulp.watch(`${paths.fonts.src}*.otf`, tottf)
    gulp.watch(`${paths.fonts.src}*.ttf`, towoff2)
}

const build = gulp.series(clear, html, styles, scripts, tottf, towoff2, img, gulp.parallel(watch, localhost));

gulp.task('default', build);

export {build};
export {fullClear};
export {togit};
export {zipDist};
