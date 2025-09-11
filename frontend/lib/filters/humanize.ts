import moment from "moment"

export const humanize = (str: string) => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase())

export const formatDate = (str: string, format = "YYYY-MM-DD") => {
    const date = moment.utc(str).local()
    const hours = date.diff(moment(), 'hours')

    if (hours <= 24)
        return date.fromNow()

    return date.format(format)
}

export const slugify = (text: string) => text.toLowerCase().trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ').trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')