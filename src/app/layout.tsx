import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';
import '@/styles/globals.scss';
import 'server-only';

export type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'DDT Vote',
  icons: '/img/ddt_logo_black.png',
};

export default function RootLayout(
  props: RootLayoutProps,
): ReactElement | null {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
