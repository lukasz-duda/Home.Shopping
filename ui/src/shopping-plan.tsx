import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Tree } from "antd";
import { TextField } from "home-shared-ui";
import { useState } from "react";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";
import { Shopping } from "./use-shopping";

export interface ShoppingPlanProps {
  shopping: Shopping;
}

export function ShoppingPlan({ shopping }: ShoppingPlanProps) {
  const { shoppingPlanning } = polishLocale;

  const [itemName, setItemName] = useState<string | null>(null);

  function addItem() {
    if (itemName) {
      shopping.addItem(itemName);
      setItemName(null);
    }
  }

  const itemsSorted = [...shopping.items].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const treeItems = itemsSorted.map((item) => {
    return {
      title: mapTreeItem(item),
      key: item.id,
    };
  });

  function mapTreeItem(item: ShoppingListItem) {
    return (
      <Flex
        justify="space-between"
        style={{ margin: 12 }}
      >
        {item.name}
        <DeleteOutlined onClick={() => shopping.removeItem(item.id)} />
      </Flex>
    );
  }

  return (
    <>
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
          treeData={treeItems}
          blockNode
        />
      </Card>
    </>
  );
}
