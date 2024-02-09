import UserResponse from './UserResponse';

export default interface UserAuthResponse extends UserResponse {
  token: string;
}