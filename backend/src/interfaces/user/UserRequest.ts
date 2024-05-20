import { Request } from 'express';

/**
 * This Request object is for auth middleware that will be passed on
 */

export default interface UserRequest extends Request {
  user?: { // Define the structure of the user property
    id: number;
    name: string;
    email: string;
    contact: string | null;
    birth_date: Date;
    active: boolean;
    gender: boolean;
    admin: boolean;
    // Add other properties as needed
  }
}