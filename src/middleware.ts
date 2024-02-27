import { TOKEN_COOKIE_NAME } from './lib/jwt.ts';
import { userApi } from './api/user.ts';
import type { APIContext, MiddlewareNext } from 'astro';
// @ts-ignore // @todo need to fix astro type, somehow it is not working
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(
  async (context: APIContext, next: MiddlewareNext) => {
    const userToken = context.cookies.get(TOKEN_COOKIE_NAME);

    if (userToken?.value) {
      const { user, error } = await userApi(context).getMyDetail();
      if (error && error.status === 401) {
        context.cookies.delete(TOKEN_COOKIE_NAME);
      }

      context.locals.error = error;
      context.locals.currentUser = user;
      context.locals.currentUserId = user?._id;
      context.locals.planId = user?.subscription?.planId;
      context.locals.hasActiveSubscription =
        user?.subscription?.status === 'active' &&
        user?.subscription?.amount > 0 &&
        user?.subscription?.interval !== 'one_time';
    }

    return next();
  },
);
