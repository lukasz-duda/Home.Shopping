import {
  GroupOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Flex, Menu, notification } from "antd";
import { useCallback, useState } from "react";
import { Groups } from "./groups";
import { polishLocale } from "./locale";
import { ShoppingList } from "./shopping-list";
import { ShoppingPlan } from "./shopping-plan";
import { useGroupping } from "./use-groupping";
import { useShopping } from "./use-shopping";

type ShoppingView = "shoppingPlan" | "shoppingList" | "groups";

const { menu } = polishLocale;

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

  const [selectedView, setSelectedView] =
    useState<ShoppingView>("shoppingList");

  function handleMenuClick(info: { key: string }) {
    setSelectedView(info.key as ShoppingView);
  }

  function selected(viewName: ShoppingView) {
    return selectedView === viewName;
  }

  const shopping = useShopping({ onInfo: showInfo });

  const groupping = useGroupping({
    onInfo: showInfo,
    warning: notificationApi.warning,
  });

  const { groups } = groupping;

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
              label: menu.shoppingPlan,
              icon: <UnorderedListOutlined />,
            },
            {
              key: "shoppingList",
              label: menu.shoppingList,
              icon: <ShoppingCartOutlined />,
            },
            {
              key: "groups",
              label: menu.groups,
              icon: <GroupOutlined />,
            },
          ]}
          onClick={handleMenuClick}
        />
        {selected("shoppingPlan") && <ShoppingPlan shopping={shopping} />}
        {selected("shoppingList") && (
          <ShoppingList
            shopping={shopping}
            groups={groups}
          />
        )}
        {selected("groups") && <Groups groupping={groupping} />}
      </Flex>
    </>
  );
}
