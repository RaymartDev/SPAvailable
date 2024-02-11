import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const generateHashedPassword = async (password : string) : Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(`${password}${process.env.SECRET_KEY}`, salt);
};

const matchPassword = async (password : string, toMatch : string) : Promise<boolean> => {
  return bcrypt.compare(`${password}${process.env.SECRET_KEY}`, toMatch);
};

const validateEmail = (email : string) : boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

const validatePhone = (phone : string) : boolean => {
  return /^(09|\+639)\d{9}$/.test(phone);
};

const generateToken = (res : Response, email : string) : string => {
  const token = jwt.sign({ email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '5d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  return token;
};

const generateVerificationToken = (email : string) : string => {
  const token = jwt.sign({ email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '1d',
  });
  return token;
};

const sendEmail = (email : string, name : string, token : string, next : NextFunction) => {

  // transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'SPAvailable Verification Email',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verify Your Email Address</h2>
      <p>Dear <b>${name},</b></p>
      <p>Thank you for registering with our service. To complete your registration, please click the button below to verify your email address:</p>
      <p>
      <a href="localhost/verify?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a>
      </p>
      <p>If you didn't sign up for an account with us, you can safely ignore this email.</p>
      <p><b>Thank you,<br> SPAvailable Team</b></p>
  </div>
  `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      next(err);
      return;
    }
  });
};

export { 
  generateHashedPassword,
  matchPassword,
  validateEmail,
  validatePhone,
  generateToken,
  sendEmail,
  generateVerificationToken,
};