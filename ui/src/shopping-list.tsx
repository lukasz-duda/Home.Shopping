import { useCallback, useEffect, useRef, useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import * as signalR from "@microsoft/signalr";
import { Button, Card, Flex, Form, Tree, message } from "antd";
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

  function itemAdded(item: ShoppingListItem) {
    setItems((prevItems) => [...prevItems, item]);
    setItemName(null);
  }

  function itemRemoved(itemId: string) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
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
    connection.on("ItemRemoved", itemRemoved);

    return () => {
      connection.stop();
    };
  }, [refreshItems]);

  const treeData = items.map((item) => {
    return {
      title: mapItem(item),
      key: item.id,
    };
  });

  function mapItem(item: ShoppingListItem) {
    return (
      <Flex
        justify="space-between"
        style={{ margin: 12 }}
      >
        {item.name}
        <DeleteOutlined onClick={() => removeItem(item.id)} />
      </Flex>
    );
  }

  function addItem() {
    connectionRef.current?.invoke("AddItem", itemName);
  }

  function removeItem(itemId: string) {
    connectionRef.current?.invoke("RemoveItem", itemId);
  }

  return (
    <Card title={shoppingPlanning.title}>
      {contextHolder}
      <Flex
        vertical
        gap={16}
      >
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

        <Tree
          treeData={treeData}
          blockNode
        />
      </Flex>
    </Card>
  );
}
