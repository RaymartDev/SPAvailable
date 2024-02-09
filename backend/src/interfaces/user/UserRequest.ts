import { Request } from 'express';

export default interface UserRequest extends Request {
  user?: { // Define the structure of the user property
    id: number;
    name: string;
    email: string;
    contact: string | null;
    birth_date: Date;
    active: boolean;
    // Add other properties as needed
  }
}