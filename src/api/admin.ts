import type { APIContext } from 'astro';
import { api } from './api.ts';

export type ColoringImage = {
  _id: string;
  prompt: string;
  title?: string;
  tags?: string[];
  status: 'pending' | 'success' | 'failed';
  url: string;
  isPublic?: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    _id: string;
    name: string;
    email: string;
    hasPurchasedSubscription: boolean;
  };
};

export function adminApi(context: APIContext) {
  return {
    list: async function (page: number = 1, userId: string = null) {
      return api(context).get<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
        data: ColoringImage[];
      }>(`${import.meta.env.PUBLIC_API_URL}/admin/v1-all-coloring-sheet`, {
        page,
        ...(userId && { userId }),
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
      }>(`${import.meta.env.PUBLIC_API_URL}/admin/v1-get-dashboard-stats`);
    },
    getUser: async function (userId: string) {
      return api(context).get<{
        name: string;
        email: string;
        createdAt: string;
        authProvider: string;
        metadata: {
          userIp?: boolean;
          hasPurchasedSubscription?: boolean;
          [key: string]: any;
        };
        totalColoringSheets: number;
        totalCredits: number;
        remainingCredits: number;
        hasActiveSubscription: boolean;
      }>(`${import.meta.env.PUBLIC_API_URL}/admin/v1-get-user`, {
        userId,
      });
    },
  };
}
