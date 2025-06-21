import { describe, expect, it } from "vitest";
import { groupItems, MatchedGroup } from "./group-items";
import { Group, MatchFragment } from "./groups-api";
import { ShoppingListItem } from "./model";

const item1: ShoppingListItem = {
  id: "item-id-1",
  name: "Name 1",
  inShoppingCart: false,
  timeAddedToCart: null,
  addedToCartBy: null,
};

const item2: ShoppingListItem = {
  id: "item-id-2",
  name: "Name 2",
  inShoppingCart: false,
  timeAddedToCart: null,
  addedToCartBy: null,
};

const matchFragment1: MatchFragment = {
  id: "match-fragment-1",
  matchString: "name 1",
  name: "match-fragment-name-1",
  priority: 1,
};

const group1: Group = {
  id: "group-1",
  name: "group-name-1",
  ordinalNumber: 2,
  matchFragments: [matchFragment1],
};

const matchedGroup1: MatchedGroup = {
  group: group1,
  matches: [
    {
      fragment: matchFragment1,
      item: item1,
    },
  ],
};

const matchFragment2: MatchFragment = {
  id: "match-fragment-2",
  matchString: "name 1",
  name: "match-fragment-name-2",
  priority: 2,
};

const group2: Group = {
  id: "group-2",
  name: "group-name-2",
  ordinalNumber: 1,
  matchFragments: [matchFragment2],
};

const matchedGroup2: MatchedGroup = {
  group: group2,
  matches: [
    {
      fragment: matchFragment2,
      item: item1,
    },
  ],
};

const matchFragment3: MatchFragment = {
  id: "match-fragment-3",
  matchString: "name 2",
  name: "match-fragment-name-2",
  priority: 2,
};

const group3: Group = {
  id: "group-3",
  name: "group-name-3",
  ordinalNumber: 1,
  matchFragments: [matchFragment3],
};

const matchedGroup3: MatchedGroup = {
  group: group3,
  matches: [
    {
      fragment: matchFragment3,
      item: item2,
    },
  ],
};

describe("groupItems", () => {
  describe("single match", () => {
    it("returns matched group", () => {
      const result = groupItems([item1], [group1]);

      expect(result.groups).toStrictEqual([matchedGroup1]);
      expect(result.items).toStrictEqual([]);
    });
  });

  describe("no match", () => {
    it("returns not matched item", () => {
      const result = groupItems([item2], [group1]);

      expect(result.groups).toStrictEqual([]);
      expect(result.items).toStrictEqual([item2]);
    });
  });

  describe("item with two matches", () => {
    it("returns higher priority match", () => {
      const result = groupItems([item1], [group1, group2]);

      expect(result.groups).toStrictEqual([matchedGroup2]);
      expect(result.items).toStrictEqual([]);
    });
  });

  describe("two groups", () => {
    it("returns groups sorted by name", () => {
      const result = groupItems([item1, item2], [group1, group3]);

      expect(result.groups).toStrictEqual([matchedGroup3, matchedGroup1]);
      expect(result.items).toStrictEqual([]);
    });
  });
});
