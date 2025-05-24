import { Button, Card, Form } from "antd";
import { TextField } from "home-shared-ui";
import { useState } from "react";
import { polishLocale } from "./locale";
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

  return (
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
  );
}
