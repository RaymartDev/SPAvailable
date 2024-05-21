"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.deleteService = exports.getServices = exports.addService = exports.deleteProduct = exports.getProducts = exports.addProduct = void 0;
const prisma_1 = require("../../prisma");
const addProduct = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const query = req.body.name.toLowerCase() || '';
        const productExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
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
        const productCreated = await (0, prisma_1.prismaFetch)(async (prisma) => {
            return prisma.product.create({
                data: req.body,
            });
        }, next);
        if (productCreated) {
            res.status(201).json(productCreated);
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
exports.addProduct = addProduct;
const getProducts = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const products = await (0, prisma_1.prismaFetch)(async (prisma) => {
            return prisma.product.findMany();
        }, next);
        if (products) {
            res.status(200).json(products);
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
exports.getProducts = getProducts;
const deleteProduct = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const { id } = req.params;
        const productExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
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
        await (0, prisma_1.prismaQuery)(async (prisma) => {
            prisma.product.delete({
                where: {
                    id: parseInt(id),
                },
            });
        }, next);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProduct = deleteProduct;
const addService = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const query = req.body.name.toLowerCase() || '';
        const serviceExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
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
        const serviceCreated = await (0, prisma_1.prismaFetch)(async (prisma) => {
            return prisma.service.create({
                data: req.body,
            });
        }, next);
        if (serviceCreated) {
            res.status(201).json(serviceCreated);
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
exports.addService = addService;
const getServices = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const services = await (0, prisma_1.prismaFetch)(async (prisma) => {
            return prisma.service.findMany();
        }, next);
        if (services) {
            res.status(200).json(services);
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
exports.getServices = getServices;
const deleteService = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const { id } = req.params;
        const productExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
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
        await (0, prisma_1.prismaQuery)(async (prisma) => {
            prisma.service.delete({
                where: {
                    id: parseInt(id),
                },
            });
        }, next);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteService = deleteService;
const deleteFeedback = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const { id } = req.params;
        const feedbackExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
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
        await (0, prisma_1.prismaQuery)(async (prisma) => {
            prisma.feedback.delete({
                where: {
                    id: parseInt(id),
                },
            });
        }, next);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteFeedback = deleteFeedback;
//# sourceMappingURL=general.controller.js.map