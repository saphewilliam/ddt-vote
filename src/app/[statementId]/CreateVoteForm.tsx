'use client';

import useForm, { selectPlugin } from '@saphe/react-form';
import { useAction } from 'next-safe-action/hooks';
import type { ReactElement } from 'react';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { createVote } from '@/data/Vote/actions';
import type { VoteValue } from '@/data/Vote/schema';
import { SelectInput } from '@/components/SelectInput';

export type CreateVoteFormProps = {
  statementId: string;
};

export function CreateVoteForm(
  props: CreateVoteFormProps,
): ReactElement | null {
  const createVoteAction = useAction(createVote);
  const form = useForm(
    { select: selectPlugin },
    {
      fields: (f) => ({
        value: f.select({
          label: 'Vote',
          validation: { required: 'Please enter a vote' },
          options: [
            { value: 'for', label: 'For' },
            { value: 'against', label: 'Against' },
            { value: 'neutral', label: 'Neutral' },
          ],
        }),
      }),
      onSubmit: ({ initialFormState, formValues }) => {
        createVoteAction.execute({
          statementId: props.statementId,
          value: formValues.value as VoteValue,
        });
        return initialFormState;
      },
    },
  );

  if (createVoteAction.status === 'executing') return <p>Processing...</p>;
  if (createVoteAction.status === 'hasSucceeded')
    return <p>Thanks for casting your vote!</p>;

  return (
    <Form {...form.props.form}>
      <SelectInput {...form.props.value} />
      <Button {...form.props.submitButton} />
    </Form>
  );
}
