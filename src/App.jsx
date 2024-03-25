import { getToken } from "@/utils/token.js";
import Layout from "@/pages/Layout/index.jsx";
import { Navigate } from "react-router-dom";

const App = () => {
  const token = getToken();
  return token ? <Layout /> : <Navigate to="/login" />;
};
export default App;
