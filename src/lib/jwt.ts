import * as jose from 'jose';
import Cookies from 'js-cookie';

export const TOKEN_COOKIE_NAME = 'rtkn';

export function createTokenCookie(token: string) {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    path: '/',
    expires: 30,
    domain: import.meta.env.DEV ? 'localhost' : '.kidscoloringpage.com',
  });
}

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};

export function decodeToken(token: string): TokenPayload {
  const claims = jose.decodeJwt(token);

  return claims as TokenPayload;
}

export function isLoggedIn() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  return !!token;
}

export function getLoggedInUser() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  if (!token) {
    return null;
  }

  return decodeToken(token);
}

export function logout() {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: '/',
    domain: import.meta.env.DEV ? 'localhost' : '.kidscoloringpage.com',
  });

  if (typeof window === 'undefined') {
    return;
  }

  // Reloading will automatically redirect the user if required
  window.location.reload();
}
