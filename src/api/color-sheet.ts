import type {APIContext} from "astro";
import {api} from "./api.ts";

export interface ColorSheetDocument {
    _id: string;
    prompt: string;
    status: 'pending' | 'success' | 'failed';
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface ListColorSheetResponse {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    data: ColorSheetDocument[],
}

export function colorSheetApi(context: APIContext) {
    return {
        list: async function () {
            return api(context).get<ListColorSheetResponse>(
                `${import.meta.env.PUBLIC_API_URL}/v1-list-coloring-sheet`,
            );
        },
    };
}