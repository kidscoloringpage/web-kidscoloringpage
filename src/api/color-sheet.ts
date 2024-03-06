import type { APIContext } from 'astro';
import { api } from './api.ts';

export function colorSheetApi(context: APIContext) {
  return {
    count: async function () {
      return api(context).get<{ count: number }>(
        `${import.meta.env.PUBLIC_API_URL}/v1-count-coloring-sheet`,
      );
    },
    myColoringPages: async function (data: { page?: number }) {
      return api(context).get<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
        data: {
          _id: string;
          prompt: string;
          url: string;
        }[];
      }>(`${import.meta.env.PUBLIC_API_URL}/v1-my-coloring-sheet`);
    },
    publicColoringPages: async function (data: {
      page?: number;
      search: string;
    }) {
      return api(context).get<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
        data: {
          _id: string;
          prompt: string;
          url: string;
        }[];
      }>(`${import.meta.env.PUBLIC_API_URL}/v1-list-coloring-sheet`, data);
    },
  };
}
