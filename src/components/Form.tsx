'use client';

import type { FormComponentProps } from '@saphe/react-form';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';

export function Form(
  props: FormComponentProps & { children: ReactNode },
): ReactElement | null {
  return (
    <form
      className={clsx('space-y-3')}
      onSubmit={props.onSubmit}
      onReset={props.onReset}
    >
      {props.children}
    </form>
  );
}
