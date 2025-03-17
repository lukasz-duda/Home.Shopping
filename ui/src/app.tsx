import { Layout } from 'antd';
import './app.css'
import '@ant-design/v5-patch-for-react-19';

const { Content } = Layout;

export default function App() {

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
      </Content>
    </Layout>
  );
}