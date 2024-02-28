import type { APIContext } from 'astro';
import { api } from './api.ts';

export function adminApi(context: APIContext) {
  return {
    list: async function (page: number = 1) {
      return api(context).get<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
        data: {
          _id: string;
          prompt: string;
          status: 'pending' | 'success' | 'failed';
          url: string;
          createdAt: Date;
          updatedAt: Date;
        }[];
      }>(`${import.meta.env.PUBLIC_API_URL}/v1-all-coloring-sheet`, {
        page,
      });
    },
    getDashboardStats: async function () {
      return api(context).get<{
        users: number;
        coloringSheets: number;
        today: {
          coloringSheets: number;
        };
        freeUsers: number;
        paidUsers: number;
        oneTimeUsers: number;
        monthlyUsers: number;
        yearlyUsers: number;
      }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-dashboard-stats`);
    },
  };
}
