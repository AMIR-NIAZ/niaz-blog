import User from 'src/User/Domain/Entities/User';
import { Payload } from '../Payload';

export const TokenService = Symbol('TokenService');

export interface TokenService {
  verifyAccessToken(token: string): Promise<Payload>;
  generateAccessToken(payload: User): Promise<string>;
  verfiyRefreshToken(token: string): Promise<Payload>;
  generateRefreshToken(payload: User): Promise<string>;
}
