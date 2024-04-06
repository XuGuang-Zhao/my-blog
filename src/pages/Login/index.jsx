import { Button, Card, Form, Input, message } from "antd";
import styled from "styled-components";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/moudles/user.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values));
    navigate("/");
    message.success("登录成功");
  };
  return (
    <LoginContainer>
      <LoginCard bordered={false}>
        <LogoImg className="login-logo" src={logo} alt="" />
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input size="large" placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/login.png");
`;

const LoginCard = styled(Card)`
  width: 440px;
  height: 360px;
  box-shadow: 0 0 50px rgb(0 0 0 / 10%);
`;

const LogoImg = styled.img`
  width: 200px;
  height: 60px;
  display: block;
  margin: 0 auto 20px;
`;

export default Login;
