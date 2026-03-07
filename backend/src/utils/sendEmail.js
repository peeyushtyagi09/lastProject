const sgMail = require("@sendgrid/mail");

function requireEnvVar(key) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

["SENDGRID_API_KEY", "SMTP_FROM"].forEach(requireEnvVar);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, text, html }) {
    if (!to || !subject || (!text && !html)) {
        throw new Error("Missing email recipient, subject, or content");
    }

    try {
        const result = await sgMail.send({
            to,
            from: process.env.SMTP_FROM,
            subject,
            text,
            html
        });

        return result;
    } catch (err) {
        console.error("Failed to send email:", { to, subject }, err.message);
        throw new Error("Failed to send email");
    }
}

async function sendOtpEmail(to, code, purpose) {
    const title =
        purpose === "verify"
            ? "Verify your email address"
            : "Your login code";

    const plainText = `Your ${purpose} code is: ${code}

This code will expire soon and should only be used by you. If you did not request this, you can ignore this message.`;

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:400px;margin:auto;background:#fafbfc;padding:32px 24px;border-radius:8px;border:1px solid #e0e4ea;">
        <h2 style="color:#222;font-size:22px;margin-bottom:18px;">${title}</h2>
        <p>Enter this code:</p>
        <p style="font-size:32px;letter-spacing:6px;font-weight:bold;background:#eff4fb;padding:12px 0;margin:16px 0;border-radius:6px;text-align:center;">
          ${code}
        </p>
        <p>This code expires soon. If you did not request it, you can ignore this email.</p>
        <p style="color:#757575;font-size:13px;margin-top:16px;">— Support Team</p>
      </div>
    `;

    await sendEmail({
        to,
        subject: title,
        text: plainText,
        html: htmlContent
    });
}

module.exports = { sendEmail, sendOtpEmail };