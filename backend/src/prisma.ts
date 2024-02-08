import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function prismaQuery(callback: (client: PrismaClient) => Promise<void>): Promise<void> {
  try {
    await callback(prisma);
  } catch (err) {
    console.error('Error executing Prisma Query', err);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting Prisma client:', disconnectError);
    }
  }
}

/**
 * @param prisma Prisma Client
 * NOTE: This function is only for demo purposes
async function exampleUsage(prisma: PrismaClient): Promise<void> {
  const users = await prisma.users.findMany();
  console.log(users);
}

prismaQuery(exampleUsage);
 */

export { prismaQuery };