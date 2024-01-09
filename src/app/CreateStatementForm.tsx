'use client';

import type { ReactElement } from 'react';
import useForm, { textPlugin } from '@saphe/react-form';
import { useAction } from 'next-safe-action/hooks';
import { createStatement } from '@/data/Statement/actions';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { TextInput } from '@/components/TextInput';

export function CreateStatementForm(): ReactElement | null {
  const createStatementAction = useAction(createStatement);
  const form = useForm(
    { text: textPlugin },
    {
      fields: (f) => ({
        title: f.text({
          label: 'Statement title',
          validation: { required: 'Please enter a title' },
        }),
      }),
      onSubmit: ({ initialFormState, formValues }) => {
        createStatementAction.execute(formValues);
        return initialFormState;
      },
    },
  );

  if (createStatementAction.status === 'executing') return <p>Processing...</p>;

  return (
    <Form {...form.props.form}>
      <TextInput {...form.props.title} />
      <Button {...form.props.submitButton} />
    </Form>
  );
}
