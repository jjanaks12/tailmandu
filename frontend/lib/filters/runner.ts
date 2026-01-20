import moment from "moment"
import type { EventRunner } from "~/lib/types"

const sortRunner = (runners: EventRunner[]) => {
    const sortedRunners = runners.sort((a, b) => {
        const alastCheckpoint = a.volunteer_on_checkpoints.find(checkpoint => checkpoint.checkpoint.is_end)
        const blastCheckpoint = b.volunteer_on_checkpoints.find(checkpoint => checkpoint.checkpoint.is_end)

        if (alastCheckpoint && blastCheckpoint)
            return moment(alastCheckpoint.timer).diff(moment(blastCheckpoint.timer))

        if (alastCheckpoint && !blastCheckpoint)
            return -1

        if (!alastCheckpoint && blastCheckpoint)
            return 1

        return 1
    })
        .filter((runner) => !['DISQUALIFIED', 'DID_NOT_FINISH'].includes(runner?.status?.status))

    const disqualifiedRunner = runners.filter((runner) => runner?.status?.status === 'DISQUALIFIED')
    const DNFRunner = runners.filter((runner) => runner?.status?.status === 'DID_NOT_FINISH')
    return [...sortedRunners, ...DNFRunner, ...disqualifiedRunner]
}

const adjustDateForTimezone = (date: Date) => {
    // Get the timezone offset in minutes for the *current* system
    const timezoneOffsetInMinutes = date.getTimezoneOffset();

    // Create a new Date object (or modify the existing one) by adding the offset
    // Using setMinutes() is a clean way to adjust the time.
    date.setMinutes(date.getMinutes() + timezoneOffsetInMinutes);

    return date;
}

/* const getDuration = (time: string, started_time: string) => {
    const started = new Date(moment.utc(started_time).local().toString())
    const now = new Date(moment.utc(time).local().toString())

    // @ts-expect-error
    const diff = now - started
    return `${Math.floor(diff / (1000 * 60 * 60))}:${(Math.floor(diff / (1000 * 60))) % 60}:${(Math.floor(diff / 1000)) % 60}`
} */
const getDuration = (time: string, started_time: string) => {
    const started = moment.utc(started_time)
    const now = moment.utc(time)

    const duration = moment.duration(now.diff(started))
    return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
}

export { sortRunner, getDuration }