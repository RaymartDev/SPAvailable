"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const pretty_error_1 = __importDefault(require("pretty-error"));
const pe = new pretty_error_1.default();
pe.skipNodeFiles(); // Skip internal Node.js files in the stack trace
pe.skipPackage('express'); // Skip packages in the stack trace
function notFound(req, res, next) {
    res.status(404);
    next(new Error(`🔍 - Not Found - ${req.originalUrl}`));
}
exports.notFound = notFound;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const stack = process.env.NODE_ENV === 'production' ? '🥞' : process.env.NODE_ENV === 'production' ? '🥞' : pe.render(err).replace(/\u001b\[\d+m/g, '').replace(/\\n/g, '\n');
    res.status(statusCode).json({
        message: err.message,
        stack,
    });
    console.log(stack);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=middlewares.js.map