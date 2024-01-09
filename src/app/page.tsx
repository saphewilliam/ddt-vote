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
import { votes } from '@/data/Vote/schema';
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
        vote: votes.value,
      })
      .from(statements)
      .where(eq(statements.createdById, userId))
      .leftJoin(votes, eq(votes.statementId, statements.id))
      .orderBy(desc(statements.createdAt)),
  );

  if (!statementsResult.ok)
    return (
      <Container>
        <p>
          Something went wrong when trying to connect to the database. Please
          contact an administrator.
        </p>
      </Container>
    );

  const distinctStatements = statementsResult.value
    .filter(
      ({ id }, index) =>
        statementsResult.value.findIndex((elem) => elem.id === id) === index,
    )
    .map(({ id, createdAt, title }) => ({ id, createdAt, title }));
  const voteCounts = statementsResult.value.reduce(
    (prev, curr) => {
      if (!curr.vote) return prev;
      if (!prev[curr.id])
        prev[curr.id] = { total: 0, for: 0, against: 0, neutral: 0 };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We allow because of the previous assertion
      const ref = prev[curr.id]!;
      ref[curr.vote]++;
      ref.total++;
      return prev;
    },
    {} as Record<
      string,
      { total: number; for: number; against: number; neutral: number }
    >,
  );

  return (
    <Container className={clsx('space-y-10')}>
      <CreateStatementForm />
      <ul className={clsx('space-y-7')}>
        {distinctStatements.map((statement) => (
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
              <span>{voteCounts[statement.id]?.total ?? 0} total</span>
              <span>-</span>
              <span>{voteCounts[statement.id]?.for ?? 0} for</span>
              <span>-</span>
              <span>{voteCounts[statement.id]?.against ?? 0} against</span>
              <span>-</span>
              <span>{voteCounts[statement.id]?.neutral ?? 0} neutral</span>
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
