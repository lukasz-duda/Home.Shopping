import {
  DeleteOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Form, Modal, Tree } from "antd";
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

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

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
        <div
          style={{ width: "100%" }}
          onClick={() => {
            setSelectedItemId(item.id);
            setSelectedItemName(item.name);
          }}
        >
          {item.name}
        </div>

        <DeleteOutlined onClick={() => shopping.removeItem(item.id)} />
      </Flex>
    );
  }
  const selectedItem = shopping.items.find(
    (item) => item.id === selectedItemId,
  );

  function changeSelectedItem() {
    if (selectedItem && selectedItemName) {
      shopping.changeItem({ ...selectedItem, name: selectedItemName });
      setSelectedItemId(null);
      setSelectedItemName(null);
    }
  }

  const itemSelected = selectedItemId !== null;

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
          <Button
            htmlType="submit"
            type="primary"
            icon={<FileAddOutlined />}
          >
            {shoppingPlanning.addItem}
          </Button>
        </Form>
      </Card>
      <Card
        title={shoppingPlanning.shoppingList}
        loading={shopping.loading}
      >
        <Tree
          treeData={treeItems}
          blockNode
        />
      </Card>
      <Modal
        title={shoppingPlanning.changeItem}
        open={itemSelected}
        okText={shoppingPlanning.saveChanges}
        okButtonProps={{ icon: <SaveOutlined /> }}
        onOk={changeSelectedItem}
        onCancel={() => setSelectedItemId(null)}
      >
        <Form
          layout="vertical"
          onFinish={changeSelectedItem}
        >
          <TextField
            label="Przedmiot"
            value={selectedItemName}
            onChange={setSelectedItemName}
          />
        </Form>
      </Modal>
    </>
  );
}
