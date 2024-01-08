import type { Config } from 'drizzle-kit';
import { environment } from './src/lib/environment';

export default {
  schema: './src/data/**/schema.ts',
  driver: 'turso',
  out: './migrations',
  dbCredentials: {
    url: environment.database.url,
    authToken: environment.database.token,
  },
} satisfies Config;
