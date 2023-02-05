export const clear = () => {
    return global.plugins.del(['dist', '!dist/img', '!dist/fonts'])
}