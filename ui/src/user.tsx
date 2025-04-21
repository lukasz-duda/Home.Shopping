export interface User {
  authenticated: boolean | null;
  name: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export async function getUser(): Promise<User> {
  const requestUrl = `${apiUrl}/user`;
  const httpResponse = await fetch(requestUrl, {
    method: "GET",
    credentials: "include",
  });

  const responseJson = await httpResponse.json();
  return responseJson as User;
}

export const loadingUser: User = {
  authenticated: null,
  name: "",
};
