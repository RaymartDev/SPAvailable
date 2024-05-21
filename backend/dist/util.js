"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailPWReset = exports.generateVerificationToken = exports.sendEmail = exports.generateToken = exports.validatePhone = exports.validateEmail = exports.matchPassword = exports.generateHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateHashedPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(`${password}${process.env.SECRET_KEY}`, salt);
};
exports.generateHashedPassword = generateHashedPassword;
const matchPassword = async (password, toMatch) => {
    return bcrypt_1.default.compare(`${password}${process.env.SECRET_KEY}`, toMatch);
};
exports.matchPassword = matchPassword;
const validateEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};
exports.validateEmail = validateEmail;
const validatePhone = (phone) => {
    return /^(09|\+639)\d{9,10}$/.test(phone);
};
exports.validatePhone = validatePhone;
const generateToken = (res, email) => {
    const token = jsonwebtoken_1.default.sign({ email }, `${process.env.SECRET_KEY}`, {
        expiresIn: '5d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    return token;
};
exports.generateToken = generateToken;
const generateVerificationToken = (email, expiry = '1d') => {
    const token = jsonwebtoken_1.default.sign({ email }, `${process.env.SECRET_KEY}`, {
        expiresIn: expiry,
    });
    return token;
};
exports.generateVerificationToken = generateVerificationToken;
const sendEmail = async (email, name, token, next) => {
    // transporter
    const transporter = nodemailer_1.default.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    });
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                reject(error);
                next(error);
                return;
            }
            resolve(success);
        });
    });
    // Define email options
    const mailOptions = {
        from: `"SPAvailable" <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: 'SPAvailable Verification Email',
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verify Your Email Address</h2>
      <p>Dear <b>${name},</b></p>
      <p>Thank you for registering with our service. To complete your registration, please click the button below to verify your email address:</p>
      <p>
      <a href="https://spavailable.vercel.app/user/verify?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a>
      </p>
      <p>If you didn't sign up for an account with us, you can safely ignore this email.</p>
      <p><b>Thank you,<br> SPAvailable Team</b></p>
  </div>
  `,
    };
    // Send the email
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                next(err);
                reject(err);
                return;
            }
            resolve(info);
        });
    });
};
exports.sendEmail = sendEmail;
const sendEmailPWReset = async (email, name, token, next) => {
    // transporter
    const transporter = nodemailer_1.default.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    });
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                reject(error);
                next(error);
                return;
            }
            resolve(success);
        });
    });
    // Define email options
    const mailOptions = {
        from: `"SPAvailable" <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: 'SPAvailable Password Reset',
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset</h2>
      <p>Dear <b>${name},</b></p>
      <p>We received a request to reset your password. If you did not request this, please ignore this email.</p>
      <p>To reset your password, please click the button below:</p>
      <p>
      <a href="https://spavailable.vercel.app/user/reset?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a>
      </p>
      <p>If the button above does not work, you can also copy and paste the following link into your browser:</p>
      <p>https://spavailable.vercel.app/user/reset?token=${token}</p>
      <p>This link will expire in 5 minutes for security reasons.</p>
      <p>If you did not request a password reset or need further assistance, please contact our support team.</p>
      <p><b>Thank you,<br> SPAvailable Team</b></p>
  </div>
  `,
    };
    // Send the email
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                next(err);
                reject(err);
                return;
            }
            resolve(info);
        });
    });
};
exports.sendEmailPWReset = sendEmailPWReset;
//# sourceMappingURL=util.js.map