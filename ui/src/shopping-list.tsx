import { useEffect, useRef, useState } from "react";

import { DeleteOutlined } from "@ant-design/.icons-x4bNdnmP";
import * as signalR from "@microsoft/signalr";
import { Button, Card, Flex, Form, Tree } from "antd";
import { TextField } from "home-shared-ui";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";

const apiUrl = import.meta.env.VITE_API_URL;

export function ShoppingList() {
  const [itemName, setItemName] = useState<string | null>(null);

  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/shopping`)
      .build();

    connectionRef.current = connection;

    connection.start().then(() => {
      connection.invoke("GetItems").then((items: ShoppingListItem[]) => {
        setItems(items);
      });

      connection.on("ItemAdded", (item: ShoppingListItem) => {
        setItems((prevItems) => [...prevItems, item]);
        setItemName(null);
      });

      connection.on("ItemRemoved", (itemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      });
    });

    return () => {
      connection.stop();
    };
  }, []);

  const treeData = items.map((item) => {
    return {
      title: mapItem(item),
      key: item.id,
    };
  });

  function mapItem(item: ShoppingListItem) {
    return (
      <Flex justify="space-between">
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

  const { shoppingPlanning } = polishLocale;

  return (
    <Card title={shoppingPlanning.title}>
      <Flex vertical gap={16}>
        <Form layout="vertical">
          <TextField
            value={itemName}
            onChange={setItemName}
            label={shoppingPlanning.item}
          />
          <Button onClick={addItem}>{shoppingPlanning.addItem}</Button>
        </Form>

        <Tree treeData={treeData} blockNode />
      </Flex>
    </Card>
  );
}
