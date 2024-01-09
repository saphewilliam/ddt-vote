import type { SingleSelectProps } from '@saphe/react-form';
import clsx from 'clsx';
import type { ReactElement } from 'react';

export function SelectInput(props: SingleSelectProps): ReactElement | null {
  return (
    <div className={clsx('flex', 'flex-col', 'space-y-1')}>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        autoComplete="off"
      >
        <option value="">Please select a vote</option>
        {props.options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error ? <p className={clsx('text-error')}>{props.error}</p> : null}
    </div>
  );
}
