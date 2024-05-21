"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const GeneralController = __importStar(require("./general/general.controller"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - Version 1 👋🌎🌍🌏',
    });
});
router.use('/user', user_router_1.default);
router.use('/spa', spa_router_1.default);
router.use('/general', general_router_1.default);
router.delete('/feedback/:id', authMiddleware_1.protect, GeneralController.deleteFeedback);
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