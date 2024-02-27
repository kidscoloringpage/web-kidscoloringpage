import { type APIContext } from 'astro';
import { api } from './api.ts';

export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  isEnabled: boolean;
  authProvider: 'google';
  metadata: Record<string, any>;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  subscription: {
    planId: string;
    name: string;
    statementDescriptor: string;
    amount: number;
    currency: string;
    interval: 'monthly' | 'yearly' | 'one_time';
    trialRequests: number;
    usedTrialRequests: number;
    status: 'active' | 'canceled' | 'expired';
    createdAt: string;
    updatedAt: string;
  };
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function userApi(context: APIContext) {
  return {
    getMyDetail: async function () {
      const { response, error } = await api(context).get<UserDocument>(
        `${import.meta.env.PUBLIC_API_URL}/v1-me`,
      );

      if (error) {
        return { error };
      }

      return { user: response };
    },
  };
}
