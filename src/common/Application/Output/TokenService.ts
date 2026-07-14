import User from 'src/User/Domain/User';
import { Payload } from '../payload';

export const TokenService = Symbol('TokenService');

export interface TokenService {
  verifyAccessToken(token: string): Promise<Payload>;
  generateAccessToken(payload: User): Promise<string>;
  verfiyRefreshToken(token: string): Promise<Payload>;
  generateRefreshToken(payload: User): Promise<string>;
}
