import { NotificationInstance } from "antd/es/notification/interface";
import { useCommand } from "home-shared-ui";
import { useCallback, useState } from "react";
import { getGroups, Group, MatchFragment, saveGroups } from "./groups-api";
import { polishLocale } from "./locale";
import { useQuery } from "./query";

const { groups: groupsLocale } = polishLocale;

export interface UseGroupsProps {
  onInfo(text: string): void;
  warning: NotificationInstance["warning"];
}

export interface Groupping {
  groups: Group[];
  addGroup: (name: string) => void;
  changeGroupName: (groupId: string, name: string | null) => void;
  changeGroupOrdinalNumber: (
    groupId: string,
    ordinalNumber: number | null,
  ) => void;
  removeGroup: (groupId: string) => void;
  addMatchFragment: (groupId: string) => void;
  changeMatchFragmentName: (
    matchFragmentId: string,
    name: string | null,
  ) => void;
  changeMatchString: (
    matchFragmentId: string,
    matchString: string | null,
  ) => void;
  changeMatchFragmentPriority: (
    matchFragmentId: string,
    priority: number | null,
  ) => void;
  removeMatchFragment: (matchFragmentId: string) => void;
  saveGroups: () => void;
  savingGroups: boolean;
}

export function useGroupping({ onInfo, warning }: UseGroupsProps): Groupping {
  const [groups, setGroups] = useState<Group[]>([]);

  const updateGroups = useCallback((groups: Group[]) => setGroups(groups), []);

  useQuery({
    query: getGroups,
    onSuccess: updateGroups,
  });

  function addGroup(name: string) {
    const groupExists = groups.some((group) => group.name === name);

    if (groupExists) {
      return;
    }

    const newGroup: Group = {
      id: newId(),
      name,
      ordinalNumber: defaultOrdinalNumber,
      matchFragments: [],
    };
    setGroups([...groups, newGroup]);
  }

  function changeGroupName(groupId: string, name: string | null) {
    setGroups((prev) =>
      prev.map((prevGroup) =>
        prevGroup.id === groupId
          ? { ...prevGroup, name: name ?? "" }
          : prevGroup,
      ),
    );
  }

  function changeGroupOrdinalNumber(
    groupId: string,
    ordinalNumber: number | null,
  ) {
    setGroups((prev) =>
      prev.map((prevGroup) =>
        prevGroup.id === groupId
          ? {
              ...prevGroup,
              ordinalNumber: Math.round(ordinalNumber ?? defaultOrdinalNumber),
            }
          : prevGroup,
      ),
    );
  }

  function removeGroup(groupId: string) {
    setGroups((prevGroups) =>
      prevGroups.filter((prevGroup) => prevGroup.id !== groupId),
    );
  }

  function addMatchFragment(groupId: string) {
    const newMatchFragment: MatchFragment = {
      id: newId(),
      name: "",
      matchString: "",
      priority: 1,
    };

    setGroups((prev) =>
      prev.map((prevGroup) =>
        prevGroup.id === groupId
          ? {
              ...prevGroup,
              matchFragments: [...prevGroup.matchFragments, newMatchFragment],
            }
          : prevGroup,
      ),
    );
  }

  function changeMatchFragmentName(
    matchFragmentId: string,
    name: string | null,
  ) {
    changeMatchFragment(matchFragmentId, (fragment) => ({
      ...fragment,
      name: name ?? "",
    }));
  }

  function changeMatchFragment(
    matchFragmentId: string,
    update: (matchFragment: MatchFragment) => MatchFragment,
  ) {
    setGroups((prevGroups) =>
      prevGroups.map((prevGroup) => {
        const newGroup: Group = {
          ...prevGroup,
          matchFragments: prevGroup.matchFragments.map((prevFragment) => {
            if (prevFragment.id === matchFragmentId) {
              return update(prevFragment);
            } else {
              return prevFragment;
            }
          }),
        };
        return newGroup;
      }),
    );
  }

  function changeMatchString(
    matchFragmentId: string,
    matchString: string | null,
  ) {
    changeMatchFragment(matchFragmentId, (fragment) => ({
      ...fragment,
      matchString: matchString ?? "",
    }));
  }

  function changeMatchFragmentPriority(
    matchFragmentId: string,
    priority: number | null,
  ) {
    if (priority !== null) {
      changeMatchFragment(matchFragmentId, (fragment) => ({
        ...fragment,
        priority,
      }));
    }
  }

  function removeMatchFragment(matchFragmentId: string) {
    setGroups((prevGroups) =>
      prevGroups.map((prevGroup) => {
        const newGroup: Group = {
          ...prevGroup,
          matchFragments: prevGroup.matchFragments.filter(
            (matchFragment) => matchFragment.id !== matchFragmentId,
          ),
        };
        return newGroup;
      }),
    );
  }

  const { execute: executeSaveGroups, pending: savingGroups } = useCommand({
    command: () => saveGroups(groups),
    errorMessage: groupsLocale.saveGroupsError,
    onSuccess: () => onInfo(groupsLocale.groupsSaved),
    warning,
  });

  const result: Groupping = {
    groups,
    addGroup,
    changeGroupName,
    changeGroupOrdinalNumber,
    removeGroup,
    addMatchFragment,
    changeMatchFragmentName,
    changeMatchString,
    changeMatchFragmentPriority,
    removeMatchFragment,
    saveGroups: executeSaveGroups,
    savingGroups,
  };

  return result;
}

function newId() {
  return crypto.randomUUID();
}

const defaultOrdinalNumber = 1;
