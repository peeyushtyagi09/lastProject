require("dotenv").config();

function parseMs(val) {
    if (!val) return undefined;
    if (/^\d+$/.test(val)) return parseInt(val, 10);
    // parses formats like "15m" -> 900000 (ms)
    const m = /^(\d+)\s*m$/.exec(val);
    if (m) return parseInt(m[1], 10) * 60 * 1000;
    return undefined;
}

const GLOBAL_RATE_LIMIT_WINDOW_MS = process.env.GLOBAL_RATE_LIMIT_WINDOW_MS ? parseMs(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS) : undefined;
const PORT = process.env.PORT || undefined;
const MONGO_URI = process.env.MONGO_URI || undefined;
const SaltValue = process.env.SaltValue || undefined;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || undefined;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || undefined;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || undefined;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || undefined;
const OTP_LENGTH = process.env.OTP_LENGTH || undefined;
const OTP_TTL_SECONDS = process.env.OTP_TTL_SECONDS || undefined;
const OTP_MAX_ATTEMPTS = process.env.OTP_MAX_ATTEMPTS || undefined;
const SMTP_HOST = process.env.SMTP_HOST || undefined;
const SMTP_PORT = process.env.SMTP_PORT || undefined;
const SMTP_USER = process.env.SMTP_USER || undefined;
const SMTP_PASS = process.env.SMTP_PASS || undefined;
const SMTP_FROM = process.env.SMTP_FROM || undefined;
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS ? parseMs(process.env.RATE_LIMIT_WINDOW_MS) : undefined;
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : undefined;
const CLIENT_URL = process.env.CLIENT_URL;

module.exports = {
    GLOBAL_RATE_LIMIT_WINDOW_MS,
    PORT,
    MONGO_URI,
    SaltValue,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN,
    OTP_LENGTH,
    OTP_TTL_SECONDS,
    OTP_MAX_ATTEMPTS,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
    CLIENT_URL,
};