import moment from "moment"
import momentTZ from "moment-timezone"

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

export const fixDateTime = (date: string, time: string) => {
    const [year, month, day] = date.split('-').map(Number)
    const [hour, minute] = time.split(':').map(Number)

    return momentTZ.utc()
        .set('year', year)
        .set('month', month - 1)
        .set('date', day)
        .set('hour', hour)
        .set('minute', minute)
        .toISOString()
}