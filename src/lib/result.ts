import type { AsyncResult, Result } from '@quintal/result';
import { asyncResultWrap, asyncRunResult, err, ok } from '@quintal/result';

export type DatabaseError = 'database-error';

export async function dbResultWrap<T>(
  func: () => Promise<T>,
): AsyncResult<T, DatabaseError> {
  const result = await asyncResultWrap(func);
  if (!result.ok) return err('database-error');
  return result;
}

export async function dbRunResult<T1, T2, E>(
  result: Result<T1, E>,
  func: (value: T1) => Promise<T2>,
): AsyncResult<T2, DatabaseError | E> {
  return asyncRunResult(result, (r) => dbResultWrap(() => func(r)));
}

export function getUnique<T>(arr: T[]): Result<T, 'no-results' | 'not-unique'> {
  if (arr.length === 0) return err('no-results');
  if (arr.length > 1) return err('not-unique');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- due to the previous checks, it is assumed that arr[0] carries a value
  return ok(arr[0]!);
}
