import { ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Flex, Menu, message } from "antd";
import { useState } from "react";
import { ShoppingList } from "./shopping-list";
import { ShoppingPlan } from "./shopping-plan";
import { useShopping } from "./use-shopping";

type ShoppingView = "shoppingPlan" | "shoppingList";

export function ShoppingApplication() {
  const [messageApi, contextHolder] = message.useMessage();

  const shopping = useShopping({ onInfo: messageApi.info });

  const [selectedView, setSelectedView] =
    useState<ShoppingView>("shoppingList");

  function handleMenuClick(info: { key: string }) {
    setSelectedView(info.key as ShoppingView);
  }

  function selected(viewName: ShoppingView) {
    return selectedView === viewName;
  }

  return (
    <>
      {contextHolder}
      <Flex
        vertical
        gap={16}
      >
        <Menu
          mode="horizontal"
          items={[
            {
              key: "shoppingPlan",
              label: "Planowanie",
              icon: <UnorderedListOutlined />,
            },
            {
              key: "shoppingList",
              label: "Zakupy",
              icon: <ShoppingCartOutlined />,
            },
          ]}
          onClick={handleMenuClick}
        />
        {selected("shoppingPlan") && <ShoppingPlan shopping={shopping} />}
        {selected("shoppingList") && <ShoppingList shopping={shopping} />}
      </Flex>
    </>
  );
}
