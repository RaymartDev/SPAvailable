"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("./authMiddleware");
const user_router_1 = __importDefault(require("./user/user.router"));
const spa_router_1 = __importDefault(require("./spa/spa.router"));
const general_router_1 = __importDefault(require("./general/general.router"));
const prisma_1 = require("../prisma");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - Version 1 👋🌎🌍🌏',
    });
});
router.use('/user', user_router_1.default);
router.use('/spa', spa_router_1.default);
router.use('/general', general_router_1.default);
router.post('/feedback', authMiddleware_1.protect, async (req, res, next) => {
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
        const { desc } = req.body;
        if (desc.length <= 10) {
            res.status(400);
            next(new Error('Feedback must have at least ten character'));
            return;
        }
        const feedbackCreated = await (0, prisma_1.prismaFetch)(async (prisma) => {
            try {
                return await prisma.feedback.create({
                    data: req.body,
                });
            }
            catch (err) {
                next(err);
            }
        }, next);
        if (feedbackCreated) {
            res.status(200).json(feedbackCreated);
            console.log(feedbackCreated);
        }
        else {
            res.status(500);
            next(new Error('Feedback creation failed'));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map