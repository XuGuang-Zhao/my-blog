import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import SubMenu from "@/pages/SubMenu/index.jsx";
import App from "@/App.jsx";
// import Layout from "@/pages/Layout/index.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        title: "主页",
        path: "/home",
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
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
