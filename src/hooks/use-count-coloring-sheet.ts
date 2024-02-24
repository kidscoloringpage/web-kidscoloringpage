import {useCallback, useState} from 'react';
import {httpGet} from "../lib/http.ts";

export interface CountColorSheetResponse {
    count: number;
}

export const useCountColoringSheet = (): [
    {
        data: CountColorSheetResponse | null;
        error: any;
        isLoading: boolean;
    },
    () => void
] => {
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<CountColorSheetResponse | null>(null);

    const countColoringSheet = useCallback(() => {
        function fetchData() {
            httpGet<CountColorSheetResponse>(
                `${import.meta.env.PUBLIC_API_URL}/v1-count-coloring-sheet`,
                {
                },
            ).then(({response, error}) => {
                setError(error);
                setData(response);
                setIsLoading(false);
            }).catch((e) => {
                setError(e);
                setIsLoading(false);
            });
        }
        fetchData();
    }, []);

    return [{data, error, isLoading}, countColoringSheet];
};