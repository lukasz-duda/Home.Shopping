import { useEffect, useRef, useState } from "react";

import * as signalR from "@microsoft/signalr";
import { Button, Card, Flex, Form, Input, Tree } from "antd";
import { polishLocale } from "./locale";

const apiUrl = import.meta.env.VITE_API_URL;

export function ShoppingList() {
  const [item, setItem] = useState("");

  const [items, setItems] = useState<string[]>([]);

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/shopping`)
      .build();

    connectionRef.current = connection;

    connection.start().then(() => {
      connection.on("ItemAdded", (item: string) => {
        setItems((prevItems) => [...prevItems, item]);
      });
    });

    return () => {
      connection.stop();
    };
  }, []);

  const treeData = items.map((item) => {
    return {
      title: item,
      key: item,
    };
  });

  function addItem() {
    connectionRef.current?.invoke("AddItem", item);
  }

  const { shoppingPlanning } = polishLocale;

  return (
    <Card title={shoppingPlanning.title}>
      <Flex vertical>
        <Form layout="vertical">
          <Form.Item label="Item">
            <Input value={item} onChange={(e) => setItem(e.target.value)} />
          </Form.Item>
          <Button onClick={addItem}>{shoppingPlanning.addItem}</Button>
        </Form>
        <Tree treeData={treeData} />
      </Flex>
    </Card>
  );
}
