import { ReactNode, useEffect } from "react";
import { polishLocale } from "./locale";
import { useUser } from "./user";

const loginUrl = import.meta.env.VITE_LOGIN_URL;

const { shoppingPlanning } = polishLocale;

export function RequireAuthenticated({ children }: { children: ReactNode }) {
  const { authenticated } = useUser();

  useEffect(() => {
    if (authenticated === false) {
      window.location.href = `${loginUrl}?redirect=${window.location.href}`;
    }
  }, [authenticated]);

  return authenticated ? children : <>{shoppingPlanning.loading}</>;
}
