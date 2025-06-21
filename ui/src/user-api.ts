export type AuthenticationStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface User {
  status: AuthenticationStatus;
  name: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export async function getUser(): Promise<User> {
  const requestUrl = `${apiUrl}/user`;
  const httpResponse = await fetch(requestUrl, {
    method: "GET",
    credentials: "include",
  });

  const apiUser = (await httpResponse.json()) as ApiUser;

  const user: User = {
    status: apiUser.name ? "authenticated" : "unauthenticated",
    name: apiUser.name,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
}

interface ApiUser {
  name: string;
}

export const loadingUser: User = {
  status: "loading",
  name: "",
};
