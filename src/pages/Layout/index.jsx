import { Layout, Menu } from "antd";
import { HomeOutlined, DiffOutlined, EditOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "测试菜单",
    key: "/test",
    icon: <EditOutlined />,
    children: [{ label: "二级菜单", key: "/subMenu", icon: <EditOutlined /> }],
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedkey = location.pathname;

  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">test</span>
          <span className="user-logout"></span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
