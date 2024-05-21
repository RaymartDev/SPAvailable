"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyReset = exports.resetPassword = exports.sendForgotPassword = exports.resendVerification = exports.verify = exports.updateProfile = exports.getUsers = exports.getProfile = exports.logout = exports.login = exports.getFeedbacks = exports.register = void 0;
const prisma_1 = require("../../prisma");
const util_1 = require("../../util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @param req Request body should contain User's info
 * @param res Response body should be User's final info
 * @param next Next function
 */
const register = async (req, res, next) => {
    try {
        const { name, email, contact, 
        // eslint-disable-next-line @typescript-eslint/naming-convention
        birth_date, password, gender, active, profile, } = req.body;
        /**
         * validation
         */
        if (password.length <= 6) {
            res.status(400);
            next(new Error('Please provide password that is at least 6 characters'));
            return;
        }
        if (!email || !name || !birth_date || !password) {
            res.status(400);
            next(new Error('Please provide all required fields'));
            return;
        }
        if (!(0, util_1.validateEmail)(email)) {
            res.status(400);
            next(new Error('Invalid email address'));
            return;
        }
        if (contact && !(0, util_1.validatePhone)(contact)) {
            res.status(400);
            next(new Error('Invalid phone number'));
            return;
        }
        /**
         * Check if already registered using email
         */
        const userExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        /**
         * If user exists throw 409 - Conflict
         * with a message - User already exists
         */
        if (userExists) {
            res.status(409);
            next(new Error('User already exists'));
            return;
        }
        /**
         * Process birth date
         */
        const [month, day, year] = birth_date.split('/');
        const dateObject = new Date(`${year}-${month}-${day}`);
        /**
         * Register user
         */
        const userCreated = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.user.create({
                    data: {
                        name,
                        email,
                        contact: contact || '',
                        birth_date: dateObject,
                        password: await (0, util_1.generateHashedPassword)(password),
                        gender,
                        active: active ?? false,
                        profile,
                        admin: false,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        /**
         * If user data is ok throw 201 - Registered
         * If user data is not ok throw 400 - Error
         */
        if (userCreated) {
            if (!userCreated.active) {
                await (0, util_1.sendEmail)(userCreated.email, userCreated.name, (0, util_1.generateVerificationToken)(userCreated.email), next);
            }
            res.status(201).json({
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                contact: userCreated.contact,
                birth_date: userCreated.birth_date,
                token: (0, util_1.generateToken)(res, userCreated.email),
                active: userCreated.active,
                gender: userCreated.gender,
                created_at: userCreated.created_at,
                profile: userCreated.profile,
                admin: userCreated.admin,
            });
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
exports.register = register;
const getFeedbacks = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        const feedback = await (0, prisma_1.prismaFetch)(async (prisma) => {
            return prisma.feedback.findMany({
                include: {
                    owner: true,
                },
            });
        }, next);
        if (!feedback) {
            res.status(404);
            next(new Error('No feedback found'));
            return;
        }
        res.status(200).json(feedback);
    }
    catch (err) {
        next(err);
    }
};
exports.getFeedbacks = getFeedbacks;
/**
 * @param req Request body should contain Login's info
 * @param res Response body should be User's final info
 * @param next Next function
 */
const login = async (req, res, next) => {
    try {
        const { email, password, verified, } = req.body;
        if (!email || (!password && !verified)) {
            res.status(400);
            next(new Error('Please provide both email and password'));
            return;
        }
        /**
         * Check if already registered using email
         */
        const userExists = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        /**
         * If user did not exists throw 401 - Unauthorized
         * with a message - Incorrect email or password
         */
        if (!userExists) {
            res.status(401);
            next(new Error('Invalid Credentials'));
            return;
        }
        /**
         * Get the user
         */
        const user = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.user.findUnique({
                    where: { email },
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        /**
         * If user did not exists throw 401 - Unauthorized
         * with a message - Incorrect email or password
         */
        if (!user) {
            res.status(401);
            next(new Error('Incorrect email or password'));
            return;
        }
        /**
         * If password did not match throw 401 - Unauthorized
         * with a message - Incorrect email or password
         */
        if (!verified && password) {
            const passwordMatch = await (0, util_1.matchPassword)(password, user.password);
            if (!passwordMatch) {
                res.status(401);
                next(new Error('Incorrect email or password'));
                return;
            }
        }
        /**
         * Return the user found with the correct email and password
         */
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            birth_date: user.birth_date,
            token: (0, util_1.generateToken)(res, user.email),
            active: user.active,
            gender: user.gender,
            created_at: user.created_at,
            profile: user.profile,
            admin: user.admin,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
/**
 * @param req Express request object
 * @param res Express response object
 * logout user
 */
const logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
};
exports.logout = logout;
/**
 *
 * @param req User object request
 * @param res Response express object
 * @param next Next express object
 * Get the user's profile
 */
const getProfile = async (req, res, next) => {
    try {
        if (req.user) {
            res.status(200).json(req.user);
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getProfile = getProfile;
const getUsers = async (req, res, next) => {
    try {
        if (req.user) {
            const user = await (0, prisma_1.prismaFetch)(async (prisma) => {
                try {
                    return await prisma.user.findMany();
                }
                catch (err) {
                    next(err);
                }
            }, next);
            res.status(200).json(user);
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
/**
 *
 * @param req User object request
 * @param res Response express object
 * @param next Next express object
 * Update the user's profile
 */
const updateProfile = async (req, res, next) => {
    try {
        if (req.user) {
            const { name, email, contact, 
            // eslint-disable-next-line @typescript-eslint/naming-convention
            birth_date, password, gender, profile, } = req.body;
            if (!name && !password && !contact && !gender && !profile) {
                res.status(400);
                next(new Error('No changes found'));
                return;
            }
            if (email) {
                delete req.body.email;
            }
            if (birth_date) {
                const [month, day, year] = birth_date.split('/');
                const dateObject = new Date(`${year}-${month}-${day}`);
                req.body.birth_date = dateObject;
            }
            if (contact && !(0, util_1.validatePhone)(contact)) {
                delete req.body.contact;
            }
            const updatedUser = await (0, prisma_1.prismaFetch)(async (prisma) => {
                try {
                    if (password) {
                        const userRaw = await prisma.user.findUnique({ where: { id: req.user?.id } });
                        const passwordMatch = await (0, util_1.matchPassword)(password, userRaw?.password || '');
                        if (passwordMatch) {
                            next(new Error('Try another combination of password that you have not used yet.'));
                            return;
                        }
                    }
                    const user = await prisma.user.update({
                        where: {
                            email: req.user && req.user.email,
                        },
                        data: {
                            gender: gender === 'male',
                            ...req.body,
                            password: await (0, util_1.generateHashedPassword)(password),
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            contact: true,
                            birth_date: true,
                            active: true,
                            gender: true,
                            profile: true,
                            admin: true,
                        },
                    });
                    return user;
                }
                catch (err) {
                    next(err);
                }
            }, next);
            res.status(200).json(updatedUser);
        }
    }
    catch (err) {
        next(err);
    }
};
exports.updateProfile = updateProfile;
/**
 *
 * @param req Request object request
 * @param res Response express object
 * @param next Next express object
 * Verify the token
 */
const verify = async (req, res, next) => {
    try {
        const token = req.query.token;
        const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        // find user
        const user = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                const userToFind = await prisma.user.findUnique({
                    where: {
                        email: decodedToken.email,
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
                return userToFind || undefined;
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (!user || user.active) {
            res.status(400);
            next(new Error('Failed to verify token'));
            return;
        }
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            res.status(400);
            next(new Error('Token has expired'));
            return;
        }
        // Update user's active status to true
        await (0, prisma_1.prismaQuery)(async (prisma) => {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    active: true,
                },
            });
        }, next);
        // Respond with success message
        return res.status(200).json({ message: 'User verified successfully' });
    }
    catch (err) {
        next(err);
    }
};
exports.verify = verify;
const resendVerification = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(400);
            next(new Error('User not found'));
            return;
        }
        if (req.user.active) {
            res.status(404);
            next(new Error('User already verified'));
            return;
        }
        await (0, util_1.sendEmail)(req.user.email, req.user.name, (0, util_1.generateVerificationToken)(req.user.email), next);
        res.status(200).json({ message: 'Successfully resent the verification code' });
    }
    catch (err) {
        next(err);
    }
};
exports.resendVerification = resendVerification;
const sendForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const searchUser = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                const userToFind = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                });
                return userToFind || undefined;
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (!searchUser) {
            res.status(404);
            next(new Error('No account associated with this email'));
            return;
        }
        await (0, util_1.sendEmailPWReset)(email, searchUser.name, (0, util_1.generateVerificationToken)(email, '10m'), next);
        res.status(200).json({ message: 'Successfully resent the verification code' });
    }
    catch (err) {
        next(err);
    }
};
exports.sendForgotPassword = sendForgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (password) {
            req.body.password = await (0, util_1.generateHashedPassword)(password);
        }
        const updatedUser = await (0, prisma_1.prismaFetch)(async (prisma) => {
            const user = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    password: req.body.password,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    contact: true,
                    birth_date: true,
                    active: true,
                    gender: true,
                    profile: true,
                },
            });
            return user;
        }, next);
        if (!updatedUser) {
            res.status(400);
            next(new Error('No account associated with this email address.'));
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
};
exports.resetPassword = resetPassword;
const verifyReset = async (req, res, next) => {
    try {
        const token = req.query.token;
        const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        // find user
        const user = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                const userToFind = await prisma.user.findUnique({
                    where: {
                        email: decodedToken.email,
                    },
                    select: {
                        id: true,
                    },
                });
                return userToFind || undefined;
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (!user) {
            res.status(400);
            next(new Error('Failed to verify token'));
            return;
        }
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            res.status(400);
            next(new Error('Token has expired'));
            return;
        }
        return res.status(200).json({ message: 'Reset password token is valid' });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyReset = verifyReset;
//# sourceMappingURL=user.controller.js.map