import type { Result } from '@quintal/result';
import { err, ok, resultWrap } from '@quintal/result';
import { cookies } from 'next/headers';
import { environment } from './environment';

export function getCookie(
  name: string,
): Result<string, 'cookie-missing' | 'third-party-error'> {
  const cookiesResult = resultWrap(() => cookies().get(name));
  if (!cookiesResult.ok) return err('third-party-error');

  const cookie = cookiesResult.value;
  if (cookie === undefined) return err('cookie-missing');

  return ok(cookie.value);
}

export function setCookie(
  name: string,
  value: string,
  expiresAt?: Date | null,
): Result<void, 'third-party-error'> {
  const cookiesResult = resultWrap(() =>
    cookies().set({
      name,
      value,
      expires: expiresAt ?? undefined,
      httpOnly: true,
      path: '/',
      secure: environment.env !== 'DEVELOPMENT',
      sameSite: 'strict',
    }),
  );

  if (!cookiesResult.ok) return err('third-party-error');
  return ok();
}

export function removeCookie(name: string): Result<void, 'third-party-error'> {
  const cookiesResult = resultWrap(() => cookies().delete(name));
  if (!cookiesResult.ok) return err('third-party-error');
  return ok();
}
