import { NextFunction, Request, Response } from 'express';
import { prismaFetch, prismaQuery } from '../../prisma';
import { PrismaClient } from '@prisma/client';
import { 
  generateHashedPassword,
  generateToken,
  matchPassword,
  validateEmail,
  validatePhone,
} from '../../util';

interface UserBody {
  name: string;
  email: string;
  contact?: string;
  birthDate: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  contact?: string | null;
  birthDate: Date;
  token: string;
  active: boolean;
}

interface LoginBody {
  email: string;
  password: string;
}

/**
 * @param req Request body should contain User's info
 * @param res Response body should be User's final info
 * @param next Next function 
 */
export const register = async (req: Request<{}, UserResponse, UserBody>, res: Response<UserResponse>, next: NextFunction) => {
  try {
    const {
      name,
      email,
      contact,
      birthDate,
      password,
    } = req.body;
    
    /**
     * validation
     */
    if (!validateEmail(email)) {
      res.status(400);
      throw new Error('Invalid email address');
    }

    if (contact && !validatePhone(contact)) {
      res.status(400);
      throw new Error('Invalid phone number');
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
      throw new Error('User already exists');
    }

    /**
     * Process birth date
     */
    // Split the birthDate string into parts
    const [month, day, year] = birthDate.split('/');
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
            contact,
            birth_date: dateObject,
            password: await generateHashedPassword(password),
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
      res.status(201).json({
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
        contact: userCreated.contact,
        birthDate: userCreated.birth_date,
        token: generateToken(res, userCreated.email),
        active: userCreated.active,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
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
export const login = async (req: Request<{}, UserResponse, LoginBody>, res: Response<UserResponse>, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;

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
      throw new Error('Incorrect email or password');
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
      throw new Error('Incorrect email or password');
    }

    /**
     * If password did not match throw 401 - Unauthorized
     * with a message - Incorrect email or password
     */
    const passwordMatch = await matchPassword(password, user.password);
    if (!passwordMatch) {
      res.status(401);
      throw new Error('Incorrect email or password');
    }

    /**
     * Return the user found with the correct email and password
     */
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      birthDate: user.birth_date,
      token: generateToken(res, user.email),
      active: user.active,
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
 * @param req Express request object
 * @param res Express response object
 * @param next Express next object
 * 
 * The purpose of this is for development 
 */
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  await prismaQuery(async (prisma: PrismaClient) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: false,
          name: true,
          email: true,
          contact: true,
          birth_date: true,
          password: false,
          created_at: false,
          updated_at: false,
        },
      }); 
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }, next);
};