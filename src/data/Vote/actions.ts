'use server';

import { ok, runResult } from '@quintal/result';
import { action } from '@/lib/action';
import { database } from '@/lib/database';
import { dbResultWrap, getUnique } from '@/lib/result';
import { insertVoteSchema, selectVoteSchema, votes } from './schema';

export const createVote = action(insertVoteSchema, async (data) => {
  const votesResult = await dbResultWrap(() =>
    database.insert(votes).values(data).returning(),
  );
  const voteResult = runResult(votesResult, getUnique);
  return runResult(voteResult, (vote) => ok(selectVoteSchema.safeParse(vote)));
});
