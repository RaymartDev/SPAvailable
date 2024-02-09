import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

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

export { 
  generateHashedPassword,
  matchPassword,
  validateEmail,
  validatePhone,
  generateToken,
};