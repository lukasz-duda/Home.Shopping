import { PropsWithChildren, useState } from "react";
import { polishLocale } from "./locale";
import { useQuery } from "./query";
import { getUser } from "./user";

const loginUrl = import.meta.env.VITE_LOGIN_URL;

const { shoppingPlanning } = polishLocale;

export function RequireAuthenticated({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);

  useQuery({
    query: getUser,
    onSuccess: (user) => {
      if (user.authenticated) {
        setAuthenticated(true);
      } else {
        window.location.href = `${loginUrl}?redirect=${window.location.href}`;
      }
    },
  });

  return authenticated ? children : <>{shoppingPlanning.loading}</>;
}
