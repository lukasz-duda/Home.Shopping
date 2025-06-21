import { Group, MatchFragment } from "./groups-api";
import { ShoppingListItem } from "./model";

export interface GroupItemsResult {
  groups: MatchedGroup[];
  items: ShoppingListItem[];
}

export interface MatchedGroup {
  group: Group;
  matches: MatchedItem[];
}

export interface MatchedItem {
  item: ShoppingListItem;
  fragment: MatchFragment;
}

interface MatchSpec {
  fragment: MatchFragment;
  group: Group;
}

interface MatchDetails {
  item: ShoppingListItem;
  fragment: MatchFragment | null;
  group: Group | null;
}

export function groupItems(
  items: ShoppingListItem[],
  groups: Group[],
): GroupItemsResult {
  const specifications: MatchSpec[] = groups
    .flatMap((group) => {
      return group.matchFragments.flatMap((fragment) => {
        const specification: MatchSpec = {
          fragment,
          group,
        };

        return specification;
      });
    })
    .sort((a, b) => (b.fragment?.priority ?? 0) - (a.fragment?.priority ?? 0));

  const matchDetails: MatchDetails[] = items.map((item) => {
    const specification = specifications.find((spec) =>
      item.name
        .toLocaleLowerCase()
        .includes(spec.fragment.matchString.toLocaleLowerCase()),
    );

    const matchDetails: MatchDetails = {
      item,
      fragment: specification?.fragment ?? null,
      group: specification?.group ?? null,
    };

    return matchDetails;
  });

  const matchedItems: MatchedGroup[] = [...groups]
    .sort((a, b) => a.ordinalNumber - b.ordinalNumber)
    .filter((group) => {
      return matchDetails.some(
        (matchDetails) => matchDetails.group?.id === group.id,
      );
    })
    .map((group) => {
      const matchedGroup: MatchedGroup = {
        group: group,
        matches: matchDetails
          .filter((matchDetails) => matchDetails.group?.id === group.id)
          .filter((matchDetails) => matchDetails.fragment !== null)
          .map((matchDetails) => {
            const matchedItem: MatchedItem = {
              item: matchDetails.item,
              fragment: matchDetails.fragment as MatchFragment,
            };
            return matchedItem;
          }),
      };

      return matchedGroup;
    });

  const matchedItemIds = matchDetails
    .filter((matchDetails) => matchDetails.fragment !== null)
    .map((matchDetails) => matchDetails.item.id);

  const remainingItems: ShoppingListItem[] = items.filter(
    (item) => !matchedItemIds.includes(item.id),
  );

  const result: GroupItemsResult = {
    groups: matchedItems,
    items: remainingItems,
  };

  return result;
}
