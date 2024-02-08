import { PrismaClient } from '@prisma/client';
import { NextFunction } from 'express';

const prisma = new PrismaClient();

async function prismaQuery(callback: (client: PrismaClient) => Promise<void>, next: NextFunction): Promise<void> {
  try {
    await callback(prisma);
  } catch (err) {
    next(err);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      next(disconnectError);
    }
  }
}

/**
 * @param prisma Prisma Client
 * NOTE: This function is only for demo purposes
prismaQuery(async (prisma: PrismaClient) => {
  try {
    // Perform Prisma queries here
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (error) {
    console.error('Error executing Prisma query:', error);
  }
});
 */

export { prismaQuery };