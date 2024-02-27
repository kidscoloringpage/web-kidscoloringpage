import type { APIContext } from 'astro';
import { api } from './api.ts';

export function colorSheetApi(context: APIContext) {
  return {
    count: async function () {
      return api(context).get<{ count: number }>(
        `${import.meta.env.PUBLIC_API_URL}/v1-count-coloring-sheet`,
      );
    },
  };
}
