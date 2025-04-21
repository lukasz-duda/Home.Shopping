import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useQuery } from "./query";

export interface User {
  authenticated: boolean | null;
  name: string;
}

const loadingUser: User = {
  authenticated: null,
  name: "",
};

const apiUrl = import.meta.env.VITE_API_URL;

async function getUser(): Promise<User> {
  const requestUrl = `${apiUrl}/user`;
  const httpResponse = await fetch(requestUrl, {
    method: "GET",
    credentials: "include",
  });

  const responseJson = await httpResponse.json();
  return responseJson as User;
}

const UserContext = createContext(loadingUser);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(loadingUser);

  const provideUser = useCallback(function (user: User) {
    setUser(user);
  }, []);

  useQuery({
    query: getUser,
    onSuccess: provideUser,
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
