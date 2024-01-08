import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import type {
  AnySQLiteColumn,
  ReferenceConfig,
  SQLiteTextBuilderInitial,
} from 'drizzle-orm/sqlite-core';
import { integer, text } from 'drizzle-orm/sqlite-core';
import { customAlphabet } from 'nanoid';
import { environment } from './environment';

const client = createClient({
  url: environment.database.url,
  authToken: environment.database.token,
});

export const database = drizzle(client, {
  logger: environment.env === 'DEVELOPMENT',
});

const ID_LENGTH = 16;

export function generateId(): string {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, ID_LENGTH);
  return nanoid();
}

export const id = {
  id: text('id', { mode: 'text', length: ID_LENGTH })
    .primaryKey()
    .notNull()
    .$default(generateId),
};

export const relation = (
  name: string,
  references: { id: AnySQLiteColumn<object> },
  action: ReferenceConfig['actions'],
): SQLiteTextBuilderInitial<string, [string, ...string[]]> =>
  text(name, { mode: 'text' }).references(() => references.id, action);

export const meta = {
  ...id,
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
};
