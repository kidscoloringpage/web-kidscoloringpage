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
    listUsers: async function (
      page: number = 1,
      filters?: {
        search?: string;
        plan?: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
      },
    ) {
      return api(context).get<{
        perPage: number;
        totalPages: number;
        currentPage: number;
        totalCount: number;
        data: Array<{
          _id?: string;
          name: string;
          email: string;
          password: string;
          isEnabled: boolean;
          authProvider: 'github' | 'google' | 'email';
          metadata?: {
            hasPurchasedSubscription?: boolean;
            hasActiveSubscription?: boolean;
            [key: string]: any;
          };
          verificationCode: string;
          resetPasswordCode: string;
          links?: {
            github?: string;
            linkedin?: string;
            twitter?: string;
            website?: string;
          };
          resetPasswordCodeAt: Date;
          verifiedAt: Date;
          createdAt: Date;
          updatedAt: Date;
          subscription: {
            _id?: string;
            userId: string;
            planId: string;
            name: string;
            statementDescriptor: string;
            amount: number;
            currency: string;
            interval: 'monthly' | 'yearly' | 'one_time';
            quantity: number;
            status: 'active' | 'canceled' | 'expired';
            trialRequests?: number;
            usedTrialRequests?: number;
            metadata?: Record<string, any>;
            createdAt: Date;
            updatedAt: Date;
          };
        }>;
      }>(`${import.meta.env.PUBLIC_API_URL}/admin/v1-list-users`, {
        page,
        ...(filters?.search && { search: filters.search }),
        ...(filters?.plan && { plan: filters.plan }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters?.dateTo && { dateTo: filters.dateTo }),
      });
    },
  };
}
