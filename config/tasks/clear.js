import {deleteAsync} from 'del';

export const clear = () => {
    return deleteAsync(['dist/**', '!dist/img', '!dist/fonts'])
}

export const fullClear = () => {
    return deleteAsync(['dist'])
}