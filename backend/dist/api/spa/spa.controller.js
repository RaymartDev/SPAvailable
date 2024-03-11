"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpa = exports.updateSpa = exports.readSpa = exports.readAllSpa = exports.createSpa = void 0;
const util_1 = require("../../util");
const prisma_1 = require("../../prisma");
const createSpa = async (req, res, next) => {
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
        if (!(0, util_1.validateEmail)(email)) {
            res.status(400);
            next(new Error('Please provide valid email address'));
            return;
        }
        if (contact && !(0, util_1.validatePhone)(contact)) {
            res.status(400);
            next(new Error('Please provide valid phone number'));
            return;
        }
        const spaExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.findFirst({
                    where: {
                        name: {
                            equals: name.toLowerCase(),
                        },
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (spaExists) {
            res.status(409);
            next(new Error('Spa with that name already exists'));
            return;
        }
        const spaCreated = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.create({
                    data: req.body,
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (spaCreated) {
            res.status(201).json(spaCreated);
        }
        else {
            res.status(400);
            next(new Error('Invalid user data'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.createSpa = createSpa;
const readAllSpa = async (req, res, next) => {
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
        const spaList = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.findMany({
                    orderBy: {
                        updated_at: 'desc',
                    },
                    include: {
                        owner: true,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (spaList) {
            res.status(200).json(spaList);
        }
        else {
            res.status(400);
            next(new Error('Something went wrong'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.readAllSpa = readAllSpa;
const readSpa = async (req, res, next) => {
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
        const id = parseInt(req.query.id);
        const spaSearch = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.findUnique({
                    where: {
                        id,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (spaSearch) {
            res.status(200).json(spaSearch);
        }
        else {
            res.status(400);
            next(new Error('Something went wrong'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.readSpa = readSpa;
const updateSpa = async (req, res, next) => {
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
        const searchSpa = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.findUnique({
                    where: {
                        id,
                    },
                });
            }
            catch (err) {
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
        if (email && !(0, util_1.validateEmail)(email)) {
            res.status(400);
            next(new Error('Please provide valid email address'));
            return;
        }
        if (contact && !(0, util_1.validatePhone)(contact)) {
            res.status(400);
            next(new Error('Please provide valid phone number'));
            return;
        }
        const updatedSpa = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.update({
                    where: {
                        id,
                    },
                    data: req.body,
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        res.status(201).json(updatedSpa);
    }
    catch (err) {
        next(err);
    }
};
exports.updateSpa = updateSpa;
const deleteSpa = async (req, res, next) => {
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
        const { id } = req.query;
        const searchSpa = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.spa.findUnique({
                    where: {
                        id: parseInt(id),
                    },
                });
            }
            catch (err) {
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
        await (0, prisma_1.prismaQuery)(async (prisma) => {
            try {
                await prisma.spa.delete({
                    where: {
                        id: parseInt(id),
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        res.status(200).json({
            message: 'Successfully deleted SPA',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteSpa = deleteSpa;
//# sourceMappingURL=spa.controller.js.map