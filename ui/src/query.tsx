import { useEffect } from "react";

export interface UseQueryProps<TResult> {
  query: () => Promise<TResult>;
  onSuccess: (result: TResult) => void;
}

export interface UseQueryResult {
  reload: () => void;
}

export function useQuery<TResult>({
  query,
  onSuccess,
}: UseQueryProps<TResult>): UseQueryResult {
  function reload() {
    query().then((result) => {
      onSuccess(result);
    });
  }

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

  const result: UseQueryResult = {
    reload,
  };

  return result;
}
