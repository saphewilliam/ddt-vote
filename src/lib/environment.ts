import { createEnvironment } from '@quintal/environment';
import { z } from 'zod';

export const environment = createEnvironment({
  values: {
    nodeEnv: {
      value: process.env.NODE_ENV,
      schema: z.enum(['production', 'development']).default('production'),
    },
    env: {
      value: process.env.NEXT_PUBLIC_ENVIRONMENT,
      schema: z
        .enum(['DEVELOPMENT', 'PREVIEW', 'PRODUCTION'])
        .default('DEVELOPMENT'),
    },
    baseUrl: {
      self: {
        value: process.env.NEXT_PUBLIC_BASE_URL_SELF,
        schema: z.string().url().default('http://localhost:3000'),
      },
    },
    database: {
      url: {
        value: process.env.DATABASE_URL,
        schema: z.string().url(),
        isServerOnly: true,
      },
      token: { value: process.env.DATABASE_TOKEN, isServerOnly: true },
    },
  },
});
