"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaFetch = exports.prismaQuery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function prismaQuery(callback, next) {
    try {
        await callback(prisma);
    }
    catch (err) {
        next(err);
    }
    finally {
        try {
            await prisma.$disconnect();
        }
        catch (disconnectError) {
            next(disconnectError);
        }
    }
}
exports.prismaQuery = prismaQuery;
async function prismaFetch(callback, next) {
    try {
        const result = await callback(prisma);
        return result;
    }
    catch (err) {
        next(err);
    }
    finally {
        try {
            await prisma.$disconnect();
        }
        catch (disconnectError) {
            next(disconnectError);
        }
    }
}
exports.prismaFetch = prismaFetch;
//# sourceMappingURL=prisma.js.map