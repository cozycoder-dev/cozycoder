"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationMailer = void 0;
const nodemailer_html_to_text_1 = require("nodemailer-html-to-text");
const logger_1 = require("../logger");
class ModerationMailer {
    constructor(transporter, config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "transporter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.transporter = transporter;
        this.transporter.use('compile', (0, nodemailer_html_to_text_1.htmlToText)());
    }
    async send({ content }, mailOpts) {
        const mail = {
            ...mailOpts,
            html: content,
            from: this.config.moderationEmail?.fromAddress,
        };
        const res = await this.transporter.sendMail(mail);
        if (!this.config.moderationEmail?.smtpUrl) {
            logger_1.mailerLogger.debug('Moderation email auth is not configured. Intended to send email:\n' +
                JSON.stringify(res, null, 2));
        }
        return res;
    }
}
exports.ModerationMailer = ModerationMailer;
//# sourceMappingURL=moderation.js.map