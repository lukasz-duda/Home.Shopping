import { Flex, Spin } from "antd";
import { theme } from "./theme";

export function LoadingIndicator() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.background,
      }}
    >
      <Spin size="large" />
    </Flex>
  );
}
