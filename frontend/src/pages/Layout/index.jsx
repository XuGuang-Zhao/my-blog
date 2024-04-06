import { Button, Layout, Menu } from "antd";
import { HomeOutlined, DiffOutlined, EditOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, fetchUserInfo } from "@/store/moudles/user.js";

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
    label: "文章发布",
    key: "/article-publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedkey = location.pathname;
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const name = useSelector((state) => {
    return state.user.userInfo.username;
  });

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Button onClick={logout}>Logout</Button>
          </span>
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
