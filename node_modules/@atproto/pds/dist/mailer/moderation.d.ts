import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ServerConfig } from '../config';
export declare class ModerationMailer {
    private config;
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    constructor(transporter: Transporter<SMTPTransport.SentMessageInfo>, config: ServerConfig);
    send({ content }: {
        content: string;
    }, mailOpts: Mail.Options): Promise<SMTPTransport.SentMessageInfo>;
}
//# sourceMappingURL=moderation.d.ts.map