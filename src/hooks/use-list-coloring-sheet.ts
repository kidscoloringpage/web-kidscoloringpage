import { useCallback, useState } from 'react';
import { httpGet } from '../lib/http.ts';

export interface ListColorSheetResponse {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  data: {
    _id: string;
    prompt: string;
    status: 'pending' | 'success' | 'failed';
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const useListColoringSheet = (): [
  {
    data: ListColorSheetResponse | null;
    error: any;
    isLoading: boolean;
  },
  () => void,
] => {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<ListColorSheetResponse | null>(null);

  const listColoringSheet = useCallback(() => {
    function fetchData() {
      httpGet<ListColorSheetResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-my-coloring-sheet`,
        {},
      )
        .then(({ response, error }) => {
          setError(error);
          setData(response);
          setIsLoading(false);
        })
        .catch((e) => {
          setError(e);
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);

  return [{ data, error, isLoading }, listColoringSheet];
};
