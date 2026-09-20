import { ImportOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { polishLocale } from "./locale";
import { Shopping } from "./use-shopping";

export interface ImportViewProps {
  shopping: Shopping;
}

// eslint-disable-next-line react-refresh/only-export-components
export function parseImportedItems(rawItems: string): string[] {
  return [
    ...new Set(
      rawItems
        .split(/[\r\n,]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    ),
  ];
}

export function ImportForm({ shopping }: ImportViewProps) {
  const { import: shoppingImport } = polishLocale;
  const [itemsText, setItemsText] = useState<string>("");

  function importItems() {
    const parsedItems = parseImportedItems(itemsText);

    if (!parsedItems.length) {
      return;
    }

    shopping.importItems(parsedItems);
    setItemsText("");
  }

  return (
    <Card title={shoppingImport.title}>
      <Form
        layout="vertical"
        onFinish={importItems}
      >
        <Form.Item>
          <Input.TextArea
            rows={10}
            value={itemsText}
            onChange={(event) => setItemsText(event.target.value)}
            placeholder={shoppingImport.placeholder}
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          icon={<ImportOutlined />}
        >
          {shoppingImport.command}
        </Button>
      </Form>
    </Card>
  );
}
