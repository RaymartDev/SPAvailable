import { jwtDecode } from 'jwt-decode';

const clientId =
  '15867473231-k56c12oom0m4nrq93gi53fdqt75qnanl.apps.googleusercontent.com';
const clientSecret = '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';

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */

interface GooglePayload {
  email: string;
  name: string;
  email_verified: boolean;
  picture: string;
  given_name: string;
  family_name: string;
}

const decodedToken = (token: string | undefined): GooglePayload | undefined => {
  return token ? jwtDecode(token) : undefined;
};

export { clientId, clientSecret, decodedToken };
