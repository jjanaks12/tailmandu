import moment from "moment"

export const humanize = (str: string) => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase())

export const formatDate = (str: string, format?: string) => {
    const date = moment.utc(str)
    const hours = date.diff(moment(), 'hours')

    if (format)
        return date.format(format)

    if (hours <= 24)
        return date.fromNow()

    return date.format(format ?? 'YYYY-MM-DD')
}

export const slugify = (text: string) => text.toLowerCase().trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ').trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const fixDateTime = (date: string, time: string) => {
    return moment
        .tz(`${date} ${time}`, "YYYY-M-D HH:mm:ss", moment.tz.guess())
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
}