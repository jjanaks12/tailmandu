import { Address, MailtrapClient } from "mailtrap"
import { promises as fs } from "fs"
import Handlebars from "handlebars"

type SendEmailProps = {
    recipients: Address[],
    subject: string
}

export const useMailTrap = () => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
    })

    const sendEmail = async (fileName: string, replacements: Record<string, any>, props: SendEmailProps) => {
        const filePath = `${process.cwd()}/src/resources/views/email/${fileName}.html`
        const source = await fs.readFile(filePath, 'utf-8')
        const template = Handlebars.compile(source)
        const HTMLToSend = template(replacements)

        try {
            await mailtrap.send({
                from: {
                    email: process.env.MAIL_ADMIN,
                    name: 'Trailmandu',
                },
                to: props.recipients,
                subject: props.subject,
                html: HTMLToSend,
            })
        } catch (error) {
            throw error
        }
    }

    return { sendEmail }
}