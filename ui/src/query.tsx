import { useEffect } from "react";

export interface UseQueryProps<TResult> {
  query: () => Promise<TResult>;
  onSuccess: (result: TResult) => void;
}

export function useQuery<TResult>({
  query,
  onSuccess,
}: UseQueryProps<TResult>) {
  useEffect(() => {
    let ignore = false;
    query().then((result) => {
      if (ignore) {
        return;
      }

      onSuccess(result);
    });

    return () => {
      ignore = true;
    };
  }, [onSuccess, query]);
}
