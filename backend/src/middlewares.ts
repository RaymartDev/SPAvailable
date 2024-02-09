import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import PrettyError from 'pretty-error';

const pe = new PrettyError();
pe.skipNodeFiles(); // Skip internal Node.js files in the stack trace
pe.skipPackage('express'); // Skip packages in the stack trace

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const errorStack = process.env.NODE_ENV === 'production' ? '🥞' : pe.render(err);
  const plainErrorStack = errorStack.replace(/\u001b\[\d+m/g, '');
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : plainErrorStack,
  });
}
