import { NextFunction, Request, Response } from 'express';
import { prismaQuery } from '../../prisma';
import { PrismaClient } from '@prisma/client';


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