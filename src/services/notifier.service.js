const nodemailer = require('nodemailer');

require('dotenv').config();

const mailerConfigs = {
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
};

class NotifierService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(mailerConfigs);
    }

    async notify(email, tenantId, amount, txReceipt) {
        // TODO: Log this event to server log file
        const timestampNow = new Date().toUTCString();
        const formattedText = `Payment for a tenant ${tenantId} with amount n has been executed at ${timestampNow}.`;
        const formattedHTML = `
            <div>
                <p>${formattedText}</p>
                <p>Tx receipt: ${txReceipt}.</p>
            </div>
        `;

        const repsonse = await this.transporter.sendMail({
            from: '"BlockStripe 👻" <blockstripepro@gmail.com>',
            to: email,
            subject: `BlockStripe: Payment executed at ${timestampNow}`,
            text: formattedText,
            html: formattedHTML,
        });

        if (repsonse.accepted) {
            console.log(`Email address ${email} notified!`);
        }
    }
}

module.exports = new NotifierService();
