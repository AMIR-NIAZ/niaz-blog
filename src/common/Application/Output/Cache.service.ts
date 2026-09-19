export const CacheService = Symbol('CacheService');

export interface CacheService {
  set(key: string, data: any, ttl: number): Promise<void>;
  del(key: string): Promise<boolean>;
  get(key: string): Promise<unknown>;
}
