import moment from "moment"

export const humanize = (str: string) => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase())

export const formatDate = (str: string, format = "YYYY-MM-DD") => {
    const hours = moment(str).diff(moment(), 'hours')

    if (hours <= 24)
        return moment(str).fromNow()

    return moment(str).format(format)
}