import { ReactNode, useEffect } from "react";
import { LoadingIndicator } from "./loading-indicator";
import { useUser } from "./use-user";

const loginUrl = import.meta.env.VITE_LOGIN_URL;

export function RequireAuthenticated({ children }: { children: ReactNode }) {
  const { status } = useUser();

  const unauthenticated = status === "unauthenticated";

  useEffect(() => {
    if (unauthenticated) {
      window.location.href = `${loginUrl}?redirect=${window.location.href}`;
    }
  }, [unauthenticated]);

  const authenticated = status === "authenticated";

  return authenticated ? children : <LoadingIndicator />;
}
