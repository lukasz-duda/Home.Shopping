import { Flex, message } from "antd";
import { ShoppingList } from "./shopping-list";
import { ShoppingPlan } from "./shopping-plan";
import { useShopping } from "./use-shopping";

export function ShoppingApplication() {
  const [messageApi, contextHolder] = message.useMessage();

  const shopping = useShopping({ onInfo: messageApi.info });

  return (
    <>
      {contextHolder}
      <Flex
        vertical
        gap={16}
      >
        <ShoppingPlan shopping={shopping} />
        <ShoppingList shopping={shopping} />
      </Flex>
    </>
  );
}
