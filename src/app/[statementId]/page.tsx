import clsx from 'clsx';
import type { ReactElement } from 'react';
import { eq } from 'drizzle-orm';
import { runResult } from '@quintal/result';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { statements } from '@/data/Statement/schema';
import { database } from '@/lib/database';
import { dbResultWrap, getUnique } from '@/lib/result';
import { CreateVoteForm } from './CreateVoteForm';
import 'server-only';

export type StatementPageProps = {
  params: { statementId: string };
};

export async function generateMetadata(
  props: StatementPageProps,
): Promise<Metadata> {
  const statementsResult = await dbResultWrap(() =>
    database
      .select({ id: statements.id, title: statements.title })
      .from(statements)
      .where(eq(statements.id, props.params.statementId)),
  );
  const statementResult = runResult(statementsResult, getUnique);

  if (!statementResult.ok) return {};
  return { title: `DDT Vote - ${statementResult.value.title}` };
}

export default async function VotePage(
  props: StatementPageProps,
): Promise<ReactElement | null> {
  const statementsResult = await dbResultWrap(() =>
    database
      .select({ id: statements.id, title: statements.title })
      .from(statements)
      .where(eq(statements.id, props.params.statementId)),
  );
  const statementResult = runResult(statementsResult, getUnique);

  if (!statementResult.ok && statementResult.error === 'no-results') notFound();

  return (
    <Container className={clsx('space-y-10')}>
      {!statementResult.ok ? (
        <p>
          Something went wrong when trying to connect to the database. Please
          contact an administrator.
        </p>
      ) : null}

      {statementResult.ok ? (
        <>
          <h1 className={clsx('font-bold', 'text-xl')}>
            Statement: {statementResult.value.title}
          </h1>
          <CreateVoteForm statementId={statementResult.value.id} />
        </>
      ) : null}
    </Container>
  );
}
