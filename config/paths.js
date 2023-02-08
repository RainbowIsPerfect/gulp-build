export const paths = {
    configs: {
        ts: 'src/configs/tsconfig.json',
    },
    styles: {
        src: 'src/styles/style.scss',
        stylewatch: 'src/styles/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/',
        srcjs: 'src/scripts/**/*.js',
        srcts: 'src/scripts/**/*.ts',
        dest: 'dist/scripts/'
    },
    images: {
        src: 'src/img/**',
        dest: 'dist/img/'
    },
    html: {
        src: 'src/*.html',
        htmlwatch: 'src/**/*.html',
        dest: 'dist'
    },
    fonts: {
        src: 'src/fonts/',
        dest: 'dist/fonts/',
    }
}