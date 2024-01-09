import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  noPadding?: boolean;
};

function getSizeClassNames(containerSize: ContainerSize): string[] {
  const classNames: Record<ContainerSize, string> = {
    xs: 'w-full',
    sm: 'sm:max-w-[640px]',
    md: 'md:max-w-[1250px]',
    lg: 'lg:max-w-[1600px]',
    xl: 'xl:max-w-[1950px]',
  };

  const className = [];
  for (const [s, c] of Object.entries(classNames)) {
    className.push(c);
    if (containerSize === s) return className;
  }
  return className;
}

export function Container(props: ContainerProps): ReactElement | null {
  return (
    <main
      className={twMerge(
        !props.noPadding && 'px-7',
        'mx-auto',
        'py-10',
        clsx(getSizeClassNames(props.size ?? 'xl')),
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}
