import { NextFunction, Response } from 'express';
import UserRequest from '../../interfaces/user/UserRequest';
import { prismaFetch, prismaQuery } from '../../prisma';
import { PrismaClient } from '@prisma/client';

export const addProduct = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }

    const query = req.body.name.toLowerCase() || '';

    const productExists = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.product.findFirst({
        where: {
          name: query,
        },
      });
    }, next);

    if (productExists) {
      res.status(409);
      next(new Error('Product with that name already exists'));
      return;
    }

    const productCreated = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.product.create({
        data: req.body,
      });
    }, next);

    if (productCreated) {
      res.status(201).json(productCreated);
    } else {
      res.status(400);
      next(new Error('Invalid user data'));
    }
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }

    const products = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.product.findMany();
    }, next);

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400);
      next(new Error('Something went wrong'));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }

    const { id } = req.params;

    const productExists = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.product.findFirst({
        where: {
          id: req.body.id || -1,
        },
      });
    }, next);

    if (!productExists) {
      res.status(404);
      next(new Error('Product not found'));
    }

    await prismaQuery(async (prisma: PrismaClient) => {
      prisma.product.delete({
        where: {
          id: parseInt(id as string),
        },
      });
    }, next);
  } catch (err) {
    next(err);
  }
};


export const addService = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
  
    const query = req.body.name.toLowerCase() || '';
  
    const serviceExists = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.service.findFirst({
        where: {
          title: query,
        },
      });
    }, next);
  
    if (serviceExists) {
      res.status(409);
      next(new Error('Service with that name already exists'));
      return;
    }
  
    const serviceCreated = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.service.create({
        data: req.body,
      });
    }, next);
  
    if (serviceCreated) {
      res.status(201).json(serviceCreated);
    } else {
      res.status(400);
      next(new Error('Invalid user data'));
    }
  } catch (err) {
    next(err);
  }
};
  
export const getServices = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
  
    const services = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.service.findMany();
    }, next);
  
    if (services) {
      res.status(200).json(services);
    } else {
      res.status(400);
      next(new Error('Something went wrong'));
    }
  } catch (err) {
    next(err);
  }
};
  
export const deleteService = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
  
    const { id } = req.params;
  
    const productExists = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.service.findFirst({
        where: {
          id: req.body.id || -1,
        },
      });
    }, next);
  
    if (!productExists) {
      res.status(404);
      next(new Error('Service not found'));
    }
  
    await prismaQuery(async (prisma: PrismaClient) => {
      prisma.service.delete({
        where: {
          id: parseInt(id as string),
        },
      });
    }, next);
  } catch (err) {
    next(err);
  }
};

export const deleteFeedback = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }
  
    const { id } = req.params;
  
    const feedbackExists = await prismaFetch(async (prisma: PrismaClient) => {
      return prisma.feedback.findFirst({
        where: {
          id: req.body.id || -1,
        },
      });
    }, next);
  
    if (!feedbackExists) {
      res.status(404);
      next(new Error('Feedback not found'));
    }
  
    await prismaQuery(async (prisma: PrismaClient) => {
      prisma.feedback.delete({
        where: {
          id: parseInt(id as string),
        },
      });
    }, next);
  } catch (err) {
    next(err);
  }
};