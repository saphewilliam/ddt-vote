'use client';

import type { ButtonComponentProps } from '@saphe/react-form';
import clsx from 'clsx';
import type { ReactElement } from 'react';

export function Button(props: ButtonComponentProps): ReactElement | null {
  return (
    <button
      className={clsx('bg-primary', 'text-white', 'px-6', 'py-1', 'rounded-sm')}
      disabled={props.isDisabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.label}
    </button>
  );
}
