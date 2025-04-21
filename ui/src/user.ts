export interface User {
  authenticated: boolean;
  name: string;
}

export const anonymousUser: User = {
  authenticated: false,
  name: "",
};

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
