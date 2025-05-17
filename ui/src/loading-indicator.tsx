import { Flex, Spin } from "antd";

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
        background: "linear-gradient(120deg, #62cff4 20%, #2c67f2 100%)",
      }}
    >
      <Spin size="large" />
    </Flex>
  );
}
