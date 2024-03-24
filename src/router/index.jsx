import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import SubMenu from "@/pages/SubMenu/index.jsx";
import Layout from "@/pages/Layout/index.jsx";
import NotFound from "@/pages/NotFound/index.jsx";
import Login from "@/pages/Login/index.jsx";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        title: "主页",
        index: true,
        element: <Home />,
      },
      {
        title: "文章",
        path: "/article",
        element: <Article />,
      },
      {
        title: "测试菜单",
        path: "/subMenu",
        element: <SubMenu />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router;
