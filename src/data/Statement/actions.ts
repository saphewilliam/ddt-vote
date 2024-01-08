import { ok, runResult } from '@quintal/result';
import { action } from '@/lib/action';
import { database } from '@/lib/database';
import { dbResultWrap, getUnique } from '@/lib/result';
import {
  insertStatementSchema,
  selectStatementSchema,
  statements,
} from './schema';

export const createStatement = action(insertStatementSchema, async (data) => {
  const statementsResult = await dbResultWrap(() =>
    database.insert(statements).values(data).returning(),
  );
  const statementResult = runResult(statementsResult, getUnique);
  return runResult(statementResult, (vote) =>
    ok(selectStatementSchema.safeParse(vote)),
  );
});
