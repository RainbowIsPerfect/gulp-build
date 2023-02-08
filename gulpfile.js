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
import { js, ts } from "./config/tasks/scripts.js";
import { localhost } from "./config/tasks/localhost.js";
import { tottf, towoff2 } from "./config/tasks/fonts.js";
import { togit } from "./config/tasks/git.js";
import { zipDist } from "./config/tasks/zip.js";

const watch = () => {
    gulp.watch(paths.styles.stylewatch, styles)
    gulp.watch(paths.html.htmlwatch, html)
    gulp.watch(paths.scripts.srcjs, js)
    gulp.watch(paths.scripts.srcts, ts)
    gulp.watch(paths.images.src, img)
    gulp.watch(`${paths.fonts.src}*.otf`, tottf)
    gulp.watch(`${paths.fonts.src}*.ttf`, towoff2)
}


const build = gulp.series(clear, gulp.parallel(html, styles, img), ts, js, tottf, towoff2, gulp.parallel(watch, localhost));

gulp.task('default', build);

export {build};
export {ts};
export {fullClear};
export {togit};
export {zipDist};
