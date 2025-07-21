import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    return {
      stores: [
        new Keyv({
          store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
        }),
        createKeyv('redis://localhost:6379'),
      ],
    };
  },
};
