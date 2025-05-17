import { ReactNode, useEffect } from "react";
import { LoadingIndicator } from "./loading-indicator";
import { useUser } from "./use-user";

const loginUrl = import.meta.env.VITE_LOGIN_URL;

export function RequireAuthenticated({ children }: { children: ReactNode }) {
  const { authenticated } = useUser();

  useEffect(() => {
    if (authenticated === false) {
      window.location.href = `${loginUrl}?redirect=${window.location.href}`;
    }
  }, [authenticated]);

  return authenticated ? children : <LoadingIndicator />;
}
