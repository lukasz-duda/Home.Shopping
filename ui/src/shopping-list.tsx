import {
  CheckOutlined,
  ShoppingCartOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Space, Tree } from "antd";
import { departments, findDepartmentItems } from "./departments";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";
import { Shopping } from "./use-shopping";

export interface ShoppingListProps {
  shopping: Shopping;
}

export function ShoppingList({ shopping }: ShoppingListProps) {
  const { items, addToCart, removeFromCart, finishShopping } = shopping;

  const { shoppingPlanning } = polishLocale;

  const itemsNotInCart = [...items]
    .filter((item) => !item.inShoppingCart)
    .sort((a, b) => a.name.localeCompare(b.name));

  const treeItemsNotInCart = departments.map((department) => {
    return {
      title: department,
      key: department,
      children: findDepartmentItems(department, itemsNotInCart).map((item) => {
        return {
          key: item.id,
          title: mapTreeItemNotInCart(item),
        };
      }),
    };
  });

  function mapTreeItemNotInCart(item: ShoppingListItem) {
    return (
      <Flex
        justify="space-between"
        style={{ margin: 12 }}
      >
        {item.name}
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
        title={shoppingPlanning.shoppingList}
        loading={shopping.loading}
      >
        <Tree
          defaultExpandAll
          treeData={treeItemsNotInCart}
          blockNode
        />
      </Card>
      <Card
        title={shoppingPlanning.itemsInCart}
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
                {shoppingPlanning.finishShopping}
              </Button>
            </Space>
          )}
        </Flex>
      </Card>
    </>
  );
}
