import type { SingleTextProps } from '@saphe/react-form';
import clsx from 'clsx';
import type { ReactElement } from 'react';

export function TextInput(props: SingleTextProps): ReactElement | null {
  return (
    <div className={clsx('flex', 'flex-col', 'space-y-1')}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        autoComplete="off"
      />
      {props.error ? <p className={clsx('text-error')}>{props.error}</p> : null}
    </div>
  );
}
