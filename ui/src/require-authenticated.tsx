import { PropsWithChildren, useEffect, useState } from "react";
import { polishLocale } from "./locale";
import { getUser } from "./user";

const loginUrl = import.meta.env.VITE_LOGIN_URL;

const { shoppingPlanning } = polishLocale;

export function RequireAuthenticated({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getUser().then((currentUser) => {
      if (!currentUser.authenticated) {
        window.location.href = `${loginUrl}?redirect=${window.location.href}`;
      } else {
        setAuthenticated(true);
      }
    });
  }, []);

  return authenticated ? children : <>{shoppingPlanning.loading}</>;
}
