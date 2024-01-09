import type { ReactElement } from 'react';
import { desc, eq } from 'drizzle-orm';
import clsx from 'clsx';
import { Container } from '@/components/Container';
import { statements } from '@/data/Statement/schema';
import { dbResultWrap } from '@/lib/result';
import { getCookie } from '@/lib/cookie';
import { database } from '@/lib/database';
import { COOKIE_NAME } from '@/lib/constants';
import { environment } from '@/lib/environment';
import { CreateStatementForm } from './CreateStatementForm';
import 'server-only';

export default async function RootPage(): Promise<ReactElement | null> {
  const voteUserIdCookieResult = getCookie(COOKIE_NAME);
  const userId = voteUserIdCookieResult.ok
    ? voteUserIdCookieResult.value
    : 'none';

  const statementsResult = await dbResultWrap(() =>
    database
      .select({
        id: statements.id,
        createdAt: statements.createdAt,
        title: statements.title,
      })
      .from(statements)
      .where(eq(statements.createdById, userId))
      .orderBy(desc(statements.createdAt)),
  );

  return (
    <Container className={clsx('space-y-10')}>
      <CreateStatementForm />

      {!statementsResult.ok ? (
        <p>
          Something went wrong when trying to connect to the database. Please
          contact an administrator.
        </p>
      ) : null}

      {statementsResult.ok ? (
        <ul className={clsx('space-y-7')}>
          {statementsResult.value.map((statement) => (
            <li key={statement.id} className={clsx('flex', 'flex-col')}>
              <p className={clsx('space-x-2')}>
                <span className={clsx('font-bold')}>{statement.title}</span>
                <span>-</span>
                <span>
                  {statement.createdAt.toLocaleDateString('nl', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </p>
              <p>{`${environment.baseUrl.self}/${statement.id}`}</p>
              <p className={clsx('space-x-6')}>
                <span>Votes:</span>
                <span>{'hello'} total</span>
                <span>-</span>
                <span>{'hello'} for</span>
                <span>-</span>
                <span>{'hello'} against</span>
                <span>-</span>
                <span>{'hello'} neutral</span>
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
