import { NextFunction, Request, Response } from 'express';
import { prismaFetch, prismaQuery } from '../../prisma';
import { PrismaClient } from '@prisma/client';
import { 
  generateHashedPassword,
  generateToken,
  matchPassword,
  validateEmail,
  validatePhone,
  sendEmail,
  generateVerificationToken,
} from '../../util';
import UserRequest from '../../interfaces/user/UserRequest';
import UserAuthResponse from '../../interfaces/user/UserAuthResponse';
import RegisterBody from '../../interfaces/user/RegisterBody';
import LoginBody from '../../interfaces/user/LoginBody';
import UserResponse from '../../interfaces/user/UserResponse';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

/**
 * @param req Request body should contain User's info
 * @param res Response body should be User's final info
 * @param next Next function 
 */
export const register = async (req: Request<{}, UserAuthResponse, RegisterBody>, res: Response<UserAuthResponse>, next: NextFunction) => {
  try {
    const {
      name,
      email,
      contact,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      birth_date,
      password,
      gender,
    } = req.body;
    
    /**
     * validation
     */
    if (!email || !name || !birth_date || !password) {
      res.status(400);
      next(new Error('Please provide all required fields'));
      return;
    }

    if (!validateEmail(email)) {
      res.status(400);
      next(new Error('Invalid email address'));
      return;
    }

    if (contact && !validatePhone(contact)) {
      res.status(400);
      next(new Error('Invalid phone number'));
      return;
    }

    /**
     * Check if already registered using email
     */
    const userExists = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.user.findUnique({
          where: {
            email,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    /**
     * If user exists throw 409 - Conflict
     * with a message - User already exists
     */
    if (userExists) {
      res.status(409);
      next(new Error('User already exists'));
      return;
    }

    /**
     * Process birth date
     */
    const [month, day, year] = birth_date.split('/');
    const dateObject = new Date(`${year}-${month}-${day}`);
    /**
     * Register user
     */
    const userCreated = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.user.create({
          data: {
            name,
            email,
            contact: contact || '',
            birth_date: dateObject,
            password: await generateHashedPassword(password),
            gender,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    /**
     * If user data is ok throw 201 - Registered
     * If user data is not ok throw 400 - Error
     */
    if (userCreated) {
      sendEmail(userCreated.email, userCreated.name, generateVerificationToken(userCreated.email), next);

      res.status(201).json({
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
        contact: userCreated.contact,
        birth_date: userCreated.birth_date,
        token: generateToken(res, userCreated.email),
        active: userCreated.active,
        gender: userCreated.gender,
      });
    } else {
      res.status(400);
      next(new Error('Invalid user data'));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @param req Request body should contain Login's info
 * @param res Response body should be User's final info
 * @param next Next function 
 */
export const login = async (req: Request<{}, UserAuthResponse, LoginBody>, res: Response<UserAuthResponse>, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      res.status(400);
      next(new Error('Please provide both email and password'));
      return;
    }

    /**
     * Check if already registered using email
     */
    const userExists = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.user.findUnique({
          where: {
            email,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    /**
     * If user did not exists throw 401 - Unauthorized
     * with a message - Incorrect email or password
     */
    if (!userExists) {
      res.status(401);
      next(new Error('Incorrect email or password'));
      return;
    }

    /**
     * Get the user
     */
    const user = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.user.findUnique({
          where: { email },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    /**
     * If user did not exists throw 401 - Unauthorized
     * with a message - Incorrect email or password
     */
    if (!user) {
      res.status(401);
      next(new Error('Incorrect email or password'));
      return;
    }

    /**
     * If password did not match throw 401 - Unauthorized
     * with a message - Incorrect email or password
     */
    const passwordMatch = await matchPassword(password, user.password);
    if (!passwordMatch) {
      res.status(401);
      next(new Error('Incorrect email or password'));
      return;
    }

    /**
     * Return the user found with the correct email and password
     */
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      birth_date: user.birth_date,
      token: generateToken(res, user.email),
      active: user.active,
      gender: user.gender,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @param req Express request object
 * @param res Express response object
 * logout user
 */
export const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
};

/**
 * 
 * @param req User object request
 * @param res Response express object
 * @param next Next express object
 * Get the user's profile
 */
export const getProfile = async (req: UserRequest, res : Response<UserResponse>, next : NextFunction) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 
 * @param req User object request
 * @param res Response express object
 * @param next Next express object
 * Update the user's profile
 */
export const updateProfile = async (req: UserRequest, res : Response<UserResponse>, next : NextFunction) => {
  try {
    if (req.user) {
      const {
        email,
        contact,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        birth_date,
        password,
      } = req.body;

      if (email) {
        delete req.body.email;
      }

      if (password) {
        req.body.password = await generateHashedPassword(password);
      }
  
      if (birth_date) {
        const [month, day, year] = birth_date.split('/');
        const dateObject = new Date(`${year}-${month}-${day}`);
        req.body.birth_date = dateObject;
      }
  
      if (contact && !validatePhone(contact)) {
        delete req.body.contact;
      }
  
      const updatedUser = await prismaFetch(async (prisma : PrismaClient) => {
        const user = await prisma.user.update({
          where: {
            email: req.user && req.user.email,
          },
          data: req.body,
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            birth_date: true,
            active: true,
            gender: true,
          },
        });
        return user;
      }, next);

      res.status(200).json(updatedUser);
    }

  } catch (err) {
    next(err);
  }
};

/**
 * 
 * @param req Request object request
 * @param res Response express object
 * @param next Next express object
 * Verify the token
 */
export const verify = async (req: Request, res : Response, next : NextFunction) => {
  try {
    const token = req.query.token as string;

    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;
    // find user
    const user = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        const userToFind = await prisma.user.findUnique({
          where: {
            email: decodedToken.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            birth_date: true,
            password: false,
            created_at: false,
            updated_at: false,
            active: true,
            gender: true,
          },
        });
        return userToFind || undefined;
      } catch (err) {
        next(err);
      }
    }, next);

    if (!user || user.active) {
      return res.status(400).json({ error: 'Failed to verify token' });
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return res.status(400).json({ error: 'Token has expired' });
    }

    // Update user's active status to true
    await prismaQuery(async (prisma : PrismaClient) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          active: true,
        },
      });
    }, next);

    // Respond with success message
    return res.status(200).json({ message: 'User verified successfully' });
  } catch (err) {
    next(err);
  }
};