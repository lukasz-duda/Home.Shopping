import { CommandResult, post } from "home-shared-ui";

export interface Group {
  id: string;
  name: string;
  ordinalNumber: number;
  matchFragments: MatchFragment[];
}

export interface MatchFragment {
  id: string;
  name: string;
  matchString: string;
  priority: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

export async function getGroups(): Promise<Group[]> {
  const requestUrl = `${apiUrl}/groups`;
  const httpResponse = await fetch(requestUrl, {
    method: "GET",
    credentials: "include",
  });

  const groups = (await httpResponse.json()) as Group[];

  return groups;
}

export async function saveGroups(groups: Group[]): Promise<CommandResult> {
  return post({ path: "/groups", request: groups });
}
