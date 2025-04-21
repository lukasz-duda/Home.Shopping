import { ReactNode, useCallback, useEffect, useState } from "react";
import { useQuery } from "./query";
import { getUser, loadingUser, User } from "./user";
import { UserContext } from "./user-context";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(loadingUser);

  const provideUser = useCallback(function (user: User) {
    setUser(user);
  }, []);

  const { reload } = useQuery({
    query: getUser,
    onSuccess: provideUser,
  });

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      reload();
    }
  }, [reload]);

  useEffect(() => {
    addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
