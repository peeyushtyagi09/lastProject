const nodemailer = require("nodemailer");
const env = require("../../example.env");

function requireEnv(key) {
    if (!env[key]) throw new Error(`Missing required environment variable: ${key}`);
}
["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"].forEach(requireEnv);

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
    // tls: {
    //     rejectUnauthorized: process.env.NODE_ENV === "production",
    // },
});

async function sendEmail({ to, subject, text, html }) {
    if (!to || !subject || (!text && !html)) {
        throw new Error("Missing email recipient, subject, or content");
    }
    try {
        const result = await transporter.sendMail({
            from: env.SMTP_FROM,
            to,
            subject,
            text,
            html,
        });
        return result;
    } catch (err) {
        console.error(
            "Failed to send email:",
            { to, subject },
            err.message
        );
        throw new Error("Failed to send email");
    }
}

async function sendOtpEmail(to, code, purpose) {
    const title =
        purpose === "verify"
            ? "Verify your email address"
            : "Your login code";
    const plainText = `Your ${purpose} code is: ${code}\n\nThis code will expire soon and should only be used by you. If you did not request this, you can ignore this message.`;
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:400px;margin:auto;background:#fafbfc;padding:32px 24px 20px 24px;border-radius:8px;border:1px solid #e0e4ea;">
        <h2 style="color:#222;font-size:22px;margin-bottom:18px;">${title}</h2>
        <p>Enter this code:</p>
        <p style="font-size:32px;letter-spacing:6px;font-weight:bold;background:#eff4fb;padding:12px 0;margin:16px 0 18px 0;border-radius:6px;display:inline-block;width:100%;text-align:center;">
          ${code}
        </p>
        <p style="margin:12px 0 0 0;">This code expires soon. If you did not request it, you can ignore this email.</p>
        <p style="color:#757575;font-size:13px;margin-top:16px;">&mdash; ${"Support Team"}</p>
      </div>
    `;
    await sendEmail({
        to,
        subject: title,
        text: plainText,
        html: htmlContent,
    });
}

module.exports = { sendEmail, sendOtpEmail };