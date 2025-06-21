import {
  CheckOutlined,
  ShoppingCartOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Space, Tree } from "antd";
import { ReactNode } from "react";
import { JSX } from "react/jsx-dev-runtime";
import { groupItems } from "./group-items";
import { Group } from "./groups-api";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";
import { Shopping } from "./use-shopping";

export interface ShoppingListProps {
  shopping: Shopping;
  groups: Group[];
}

const { shoppingList } = polishLocale;

interface TreeItem {
  key: string;
  title: ReactNode;
  children?: TreeItem[];
}

export function ShoppingList({ shopping, groups }: ShoppingListProps) {
  const { items, addToCart, removeFromCart, finishShopping } = shopping;

  const itemsNotInCart = [...items]
    .filter((item) => !item.inShoppingCart)
    .sort((a, b) => a.name.localeCompare(b.name));

  const groupItemsResult = groupItems(itemsNotInCart, groups);

  const itemsNotInCartGroups: TreeItem[] = groups
    .map((group) => {
      const matchedGroup = groupItemsResult.groups.find(
        (match) => match.group.id === group.id,
      );

      const groupTreeItem: TreeItem = {
        key: group.id,
        title: group.name,
        children: matchedGroup?.matches.map((matchedItem) => {
          return {
            key: matchedItem.item.id,
            title: mapTreeItemNotInCart(
              matchedItem.item,
              matchedItem.fragment.name,
            ),
          };
        }),
      };
      return groupTreeItem;
    })
    .filter((group) => group.children);

  const itemsNotInCartNotMatched: TreeItem[] = groupItemsResult.items.map(
    (item) => {
      const treeItem: TreeItem = {
        key: item.id,
        title: mapTreeItemNotInCart(item),
      };
      return treeItem;
    },
  );

  const treeItemsNotInCart: TreeItem[] = [
    ...itemsNotInCartGroups,
    ...itemsNotInCartNotMatched,
  ];

  function mapTreeItemNotInCart(
    item: ShoppingListItem,
    prefix?: string,
  ): JSX.Element {
    return (
      <Flex
        justify="space-between"
        style={{ margin: 12 }}
      >
        {`${prefix ?? ""} ${item.name}`}
        <ShoppingCartOutlined onClick={() => addToCart(item.id)} />
      </Flex>
    );
  }

  const itemsInCart = [...items]
    .filter((item) => item.inShoppingCart)
    .sort(
      (a, b) =>
        `${a.timeAddedToCart}`.localeCompare(`${b.timeAddedToCart}`) * -1,
    );

  const treeItemsInCart = itemsInCart.map((item) => {
    return {
      title: mapTreeItemInCart(item),
      key: item.id,
    };
  });

  function mapTreeItemInCart(item: ShoppingListItem) {
    return (
      <Flex
        justify="space-between"
        style={{ margin: 12 }}
      >
        <Space size="middle">
          {item.name}
          <ShoppingCartOutlined />
          {item.timeAddedToCart &&
            new Date(item.timeAddedToCart).toLocaleTimeString()}{" "}
          {item.addedToCartBy?.charAt(0).toUpperCase()}
        </Space>
        <UndoOutlined onClick={() => removeFromCart(item.id)} />
      </Flex>
    );
  }

  return (
    <>
      <Card
        title={shoppingList.shoppingList}
        loading={shopping.loading}
      >
        <Tree
          defaultExpandAll
          treeData={treeItemsNotInCart}
          blockNode
        />
      </Card>
      <Card
        title={shoppingList.itemsInCart}
        loading={shopping.loading}
      >
        <Flex
          vertical
          gap={16}
        >
          <Tree
            treeData={treeItemsInCart}
            blockNode
          />
          {itemsInCart && (
            <Space>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={finishShopping}
              >
                {shoppingList.finishShopping}
              </Button>
            </Space>
          )}
        </Flex>
      </Card>
    </>
  );
}
