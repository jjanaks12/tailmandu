export { showImage, getGPXFile } from './show_image'
export { abbr } from './abbr'
export { humanize, formatDate, slugify, fixDateTime } from './humanize'
export { isObjEq } from './isObjectEqual'
export { debounce } from './debounce'

export const pad = (n: string, width: number, z = '0') => {
    n = n + ''
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}