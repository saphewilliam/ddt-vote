'use server';

import { ok, runResult } from '@quintal/result';
import { revalidatePath } from 'next/cache';
import { action } from '@/lib/action';
import { database, generateId } from '@/lib/database';
import { dbResultWrap, getUnique } from '@/lib/result';
import { getCookie, setCookie } from '@/lib/cookie';
import { COOKIE_NAME } from '@/lib/constants';
import {
  insertStatementSchema,
  selectStatementSchema,
  statements,
} from './schema';

export const createStatement = action(insertStatementSchema, async (data) => {
  const voteUserIdCookieResult = getCookie(COOKIE_NAME);

  let createdById = '';
  if (voteUserIdCookieResult.ok) createdById = voteUserIdCookieResult.value;
  else {
    createdById = generateId();
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5);
    setCookie(COOKIE_NAME, createdById, d);
  }

  const statementsResult = await dbResultWrap(() =>
    database
      .insert(statements)
      .values({ ...data, createdById })
      .returning(),
  );
  const statementResult = runResult(statementsResult, getUnique);
  return runResult(statementResult, (statement) => {
    revalidatePath('/');
    return ok(selectStatementSchema.safeParse(statement));
  });
});
