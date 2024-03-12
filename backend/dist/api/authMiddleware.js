"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma");
const protect = async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
            req.user = await (0, prisma_1.prismaFetch)(async (prisma) => {
                try {
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
                }
                catch (err) {
                    next(err);
                }
            }, next);
            // Check if user is undefined
            if (!req.user) {
                res.status(401);
                res.cookie('jwt', '', {
                    httpOnly: true,
                    expires: new Date(0),
                });
                next(new Error('Not authorized no token'));
            }
            next();
        }
        catch (err) {
            res.status(401);
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0),
            });
            next(new Error('Not authorized no token'));
        }
    }
    else {
        res.status(401);
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        next(new Error('Not authorized no token'));
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map