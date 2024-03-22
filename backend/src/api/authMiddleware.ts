import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { prismaFetch } from '../prisma';
import { PrismaClient } from '@prisma/client';
import UserRequest from '../interfaces/user/UserRequest';

const protect = async (req: Request, res: Response, next : NextFunction) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;
      (req as UserRequest).user = await prismaFetch(async (prisma : PrismaClient) => {
        const user = await prisma.user.findUnique({
          where: {
            email: decoded.email,
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
        return user || undefined;
      }, next);
      // Check if user is undefined
      if (!(req as UserRequest).user) { 
        res.status(401);
        next(new Error('Not authorized no token'));
      }
      next();
    } catch (err) {
      res.status(401);
      next(new Error('Not authorized no token'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized no token'));
  }
};

export { protect };