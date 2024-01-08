import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { meta } from '@/lib/database';

export const statements = sqliteTable('statements', {
  ...meta,
  title: text('title', { mode: 'text', length: 255 }).notNull(),
});

export type SelectStatement = InferSelectModel<typeof statements>;
export type InsertStatement = InferInsertModel<typeof statements>;

export const selectStatementSchema = createSelectSchema(statements);
export const insertStatementSchema = createInsertSchema(statements);
