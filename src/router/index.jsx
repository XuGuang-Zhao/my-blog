import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import NotFound from "@/pages/NotFound/index.jsx";
import Login from "@/pages/Login/index.jsx";
import App from "@/App.jsx";
import ArticlePublish from "@/pages/ArticlePublish/index.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
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
        title: "文章发布",
        path: "/article-publish",
        element: <ArticlePublish />,
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
