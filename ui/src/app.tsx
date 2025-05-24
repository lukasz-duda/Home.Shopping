import "@ant-design/v5-patch-for-react-19";
import { Layout } from "antd";
import "./app.css";
import { RequireAuthenticated } from "./require-authenticated";
import { ShoppingApplication } from "./shopping-application";
import { UserProvider } from "./user-provider";

const { Content } = Layout;

export default function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <UserProvider>
          <RequireAuthenticated>
            <ShoppingApplication />
          </RequireAuthenticated>
        </UserProvider>
      </Content>
    </Layout>
  );
}
