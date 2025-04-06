"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMailer = void 0;
const nodemailer_html_to_text_1 = require("nodemailer-html-to-text");
const logger_1 = require("../logger");
const templates = __importStar(require("./templates"));
// @TODO Add support for i18n
class ServerMailer {
    constructor(transporter, config) {
        Object.defineProperty(this, "transporter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: transporter
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        transporter.use('compile', (0, nodemailer_html_to_text_1.htmlToText)());
    }
    // The returned config can be used inside email templates.
    static getEmailConfig(_config) {
        return {};
    }
    async sendResetPassword(params, mailOpts) {
        await this.sendTemplate('resetPassword', params, {
            subject: 'Password Reset Requested',
            ...mailOpts,
        });
    }
    async sendAccountDelete(params, mailOpts) {
        await this.sendTemplate('deleteAccount', params, {
            subject: 'Account Deletion Requested',
            ...mailOpts,
        });
    }
    async sendConfirmEmail(params, mailOpts) {
        await this.sendTemplate('confirmEmail', params, {
            subject: 'Email Confirmation',
            ...mailOpts,
        });
    }
    async sendUpdateEmail(params, mailOpts) {
        await this.sendTemplate('updateEmail', params, {
            subject: 'Email Update Requested',
            ...mailOpts,
        });
    }
    async sendPlcOperation(params, mailOpts) {
        await this.sendTemplate('plcOperation', params, {
            subject: 'PLC Update Operation Requested',
            ...mailOpts,
        });
    }
    async sendTemplate(templateName, params, mailOpts) {
        const html = templates[templateName]({
            ...params,
            config: ServerMailer.getEmailConfig(this.config),
        });
        const res = await this.transporter.sendMail({
            ...mailOpts,
            from: mailOpts.from ?? this.config.email?.fromAddress,
            html,
        });
        if (!this.config.email?.smtpUrl) {
            logger_1.mailerLogger.debug('No SMTP URL has been configured. Intended to send email:\n' +
                JSON.stringify(res, null, 2));
        }
        return res;
    }
}
exports.ServerMailer = ServerMailer;
//# sourceMappingURL=index.js.map