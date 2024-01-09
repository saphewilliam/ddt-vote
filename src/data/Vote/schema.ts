import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { meta, relation } from '@/lib/database';
import { statements } from '../Statement/schema';

export const voteValue = ['for', 'neutral', 'against'] as const;
export type VoteValue = (typeof voteValue)[number];

export const votes = sqliteTable('votes', {
  ...meta,
  value: text('value', { enum: voteValue, mode: 'text' }).notNull(),
  statementId: relation('statement_id', statements, {
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }).notNull(),
});

export type SelectVote = InferSelectModel<typeof votes>;
export type InsertVote = InferInsertModel<typeof votes>;

export const selectVoteSchema = createSelectSchema(votes);
export const insertVoteSchema = createInsertSchema(votes).pick({
  value: true,
  statementId: true,
});
