import { ShoppingCartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Flex, Menu, notification } from "antd";
import { useCallback, useState } from "react";
import { ShoppingList } from "./shopping-list";
import { ShoppingPlan } from "./shopping-plan";
import { useShopping } from "./use-shopping";

type ShoppingView = "shoppingPlan" | "shoppingList";

export function ShoppingApplication() {
  const [notificationApi, contextHolder] = notification.useNotification();

  const showInfo = useCallback(
    function (message: string) {
      notificationApi.info({
        message,
        duration: 2,
        placement: "bottom",
      });
    },
    [notificationApi],
  );

  const shopping = useShopping({ onInfo: showInfo });

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
