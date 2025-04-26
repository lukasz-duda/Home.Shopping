import { useCallback, useEffect, useRef, useState } from "react";

import {
  CheckOutlined,
  ShoppingCartOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import * as signalR from "@microsoft/signalr";
import { Button, Card, Flex, Form, Space, Tree, message } from "antd";
import { TextField } from "home-shared-ui";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";

const apiUrl = import.meta.env.VITE_API_URL;

export function ShoppingList() {
  const [itemName, setItemName] = useState<string | null>(null);

  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const { shoppingPlanning } = polishLocale;

  const [messageApi, contextHolder] = message.useMessage();

  const refreshItems = useCallback(
    function () {
      connectionRef.current
        ?.invoke("GetItems")
        .then((items: ShoppingListItem[]) => {
          setItems(items);
          messageApi.info(shoppingPlanning.itemsRefreshed);
        });
    },
    [messageApi, shoppingPlanning.itemsRefreshed],
  );

  function addItem() {
    connectionRef.current?.invoke("AddItem", itemName);
  }

  function itemAdded(item: ShoppingListItem) {
    setItems((prevItems) => [...prevItems, item]);
    setItemName(null);
  }

  function addToCart(itemId: string) {
    connectionRef.current?.invoke("AddToCart", itemId);
  }

  function itemAddedToCart(updatedItem: ShoppingListItem) {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        return prevItem.id === updatedItem.id ? updatedItem : prevItem;
      }),
    );
  }

  function removeFromCart(itemId: string) {
    connectionRef.current?.invoke("RemoveFromCart", itemId);
  }

  function itemRemovedFromCart(updatedItem: ShoppingListItem) {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        return prevItem.id === updatedItem.id ? updatedItem : prevItem;
      }),
    );
  }

  function finishShopping() {
    connectionRef.current?.invoke("FinishShopping");
  }

  function shoppingFinished() {
    setItems((prevItems) => prevItems.filter((item) => !item.inShoppingCart));
  }

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/shopping`)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.start().then(refreshItems);
    connection.onreconnected(refreshItems);
    connection.on("ItemAdded", itemAdded);
    connection.on("ItemAddedToCart", itemAddedToCart);
    connection.on("ItemRemovedFromCart", itemRemovedFromCart);
    connection.on("ShoppingFinished", shoppingFinished);

    return () => {
      connection.stop();
    };
  }, [refreshItems]);

  const itemsNotInCart = [...items]
    .filter((item) => !item.inShoppingCart)
    .sort((a, b) => a.name.localeCompare(b.name));

  const treeItemsNotInCart = itemsNotInCart.map((item) => {
    return {
      title: mapTreeItemNotInCart(item),
      key: item.id,
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
          {item.addedToCartBy}
        </Space>
        <UndoOutlined onClick={() => removeFromCart(item.id)} />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      gap={16}
    >
      {contextHolder}
      <Card title={shoppingPlanning.title}>
        <Form
          layout="vertical"
          onFinish={addItem}
        >
          <TextField
            value={itemName}
            onChange={setItemName}
            label={shoppingPlanning.item}
          />
          <Button htmlType="submit">{shoppingPlanning.addItem}</Button>
        </Form>
      </Card>

      <Card title={shoppingPlanning.shoppingList}>
        <Tree
          treeData={treeItemsNotInCart}
          blockNode
        />
      </Card>

      <Card title={shoppingPlanning.itemsInCart}>
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
    </Flex>
  );
}
