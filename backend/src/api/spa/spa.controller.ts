import { 
  Request, NextFunction, Response } from 'express';
import UserRequest from '../../interfaces/user/UserRequest';
import SpaObject from '../../interfaces/spa/SpaInterface';
import { validateEmail, validatePhone } from '../../util';
import { PrismaClient } from '@prisma/client';
import { prismaFetch, prismaQuery } from '../../prisma';
import MessageResponse from '../../interfaces/MessageResponse';

export const createSpa = async (req: UserRequest, res: Response<SpaObject>, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }

    if (!req.user.active) {
      res.status(404);
      next(new Error('User not yet verified'));
      return;
    }

    const { name, email, contact, desc } = req.body;

    /**
     * validation
     */
    if (!name || !desc) {
      res.status(400);
      next(new Error('Please provide all required fields'));
      return;
    }

    if (!validateEmail(email)) {
      res.status(400);
      next(new Error('Please provide valid email address'));
      return;
    }

    if (contact && !validatePhone(contact)) {
      res.status(400);
      next(new Error('Please provide valid phone number'));
      return;
    }

    const spaExists = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findFirst({
          where: {
            name: {
              equals: name.toLowerCase(),
            },
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    if (spaExists) {
      res.status(409);
      next(new Error('Spa with that name already exists'));
      return;
    }

    const spaCreated = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.create({
          data: req.body,
        });
      } catch (err) {
        next(err);
      }
    }, next);

    if (spaCreated) {
      res.status(201).json(spaCreated);
    } else {
      res.status(400);
      next(new Error('Invalid user data'));
    }
  } catch (err) {
    next(err);
  }
};

export const readAllSpa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const spaList = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findMany({
          orderBy: {
            updated_at: 'desc',
          },
          include: {
            owner: true,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);

    if (spaList) {
      res.status(200).json(spaList);
    } else {
      res.status(400);
      next(new Error('Something went wrong'));
    }
  } catch (err) {
    next(err);
  }
};

export const readSpa = async (req: UserRequest, res: Response<SpaObject>, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
    
    if (!req.user.active) {
      res.status(404);
      next(new Error('User not yet verified'));
      return;
    }

    const id = parseInt(req.query.id as string);
  
    const spaSearch = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findUnique({
          where: {
            id,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);
  
    if (spaSearch) {
      res.status(200).json(spaSearch);
    } else {
      res.status(400);
      next(new Error('Something went wrong'));
    }
  } catch (err) {
    next(err);
  }
};

export const updateSpa = async (req: UserRequest, res: Response<SpaObject>, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
      
    if (!req.user.active) {
      res.status(404);
      next(new Error('User not yet verified'));
      return;
    }
  
    const { id, email, contact } = req.body;
    
    const searchSpa = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findUnique({
          where: {
            id,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);
    
    if (!searchSpa) {
      res.status(404);
      next(new Error('No SPA found'));
      return;
    }
  
    if (searchSpa.ownerId !== req.user?.id) {
      res.status(400);
      next(new Error('You have no permission to do that'));
      return;
    }

    if (email && !validateEmail(email)) {
      res.status(400);
      next(new Error('Please provide valid email address'));
      return;
    }
  
    if (contact && !validatePhone(contact)) {
      res.status(400);
      next(new Error('Please provide valid phone number'));
      return;
    }

    const updatedSpa = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.update({
          where: {
            id,
          },
          data: req.body,
        });
      } catch (err) {
        next(err);
      }
    }, next);

    res.status(201).json(updatedSpa);
  } catch (err) {
    next(err);
  }
};

export const deleteSpa = async (req: UserRequest, res: Response<MessageResponse>, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
    
    if (!req.user.active) {
      res.status(404);
      next(new Error('User not yet verified'));
      return;
    }

    const { id } = req.params;
  
    const searchSpa = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findUnique({
          where: {
            id: parseInt(id as string),
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);
  
    if (!searchSpa) {
      res.status(404);
      next(new Error('No SPA found'));
      return;
    }

    if (searchSpa.ownerId !== req.user?.id) {
      res.status(400);
      next(new Error('You have no permission to do that'));
      return;
    }

    await prismaQuery(async (prisma : PrismaClient) => {
      try {
        await prisma.spa.delete({
          where: {
            id: parseInt(id as string),
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);
    
    res.status(200).json({
      message: 'Successfully deleted SPA',
    });
  } catch (err) {
    next(err);
  }
};