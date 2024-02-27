import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from './jwt.ts';

export const AUTH_REDIRECT_KEY = 'authRedirect';

export function redirectAuthSuccess() {
  if (typeof window === 'undefined') {
    return;
  }

  window.location.href =
    window.localStorage.getItem(AUTH_REDIRECT_KEY) || '/dashboard';
}

function redirectGuestUser() {
  const authenticatedRoutes = ['/dashboard'];

  // If the user is on an authenticated route, redirect them to the home page
  if (authenticatedRoutes.includes(window.location.pathname)) {
    window.location.href = '/';
  }
}

// Prepares the UI for the user who is logged out
function redirectAuthenticatedUser() {
  const guestRoutes = [
    '/login',
    '/signup',
    '/verify-account',
    '/verification-pending',
    '/reset-password',
    '/forgot-password',
  ];

  // If the user is on a guest route, redirect them to the home page
  if (guestRoutes.includes(window.location.pathname)) {
    redirectAuthSuccess();
  }
}

export function triggerAuthRedirects() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    redirectAuthenticatedUser();
  } else {
    redirectGuestUser();
  }
}

if (typeof window !== 'undefined') {
  window.setTimeout(() => {
    triggerAuthRedirects();
  }, 0);
}
