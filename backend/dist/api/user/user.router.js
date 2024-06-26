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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = __importStar(require("./user.controller"));
const authMiddleware_1 = require("../authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.delete('/delete/:id', authMiddleware_1.protect, UserController.del);
// protected routes
router.route('/profile')
    .get(authMiddleware_1.protect, UserController.getProfile)
    .put(authMiddleware_1.protect, UserController.updateProfile);
router.get('/verify', UserController.verify);
router.get('/resend', authMiddleware_1.protect, UserController.resendVerification);
router.get('/users', authMiddleware_1.protect, UserController.getUsers);
router.get('/feedbacks', authMiddleware_1.protect, UserController.getFeedbacks);
router.route('/reset')
    .post(UserController.sendForgotPassword)
    .get(UserController.verifyReset)
    .put(UserController.resetPassword);
exports.default = router;
//# sourceMappingURL=user.router.js.map