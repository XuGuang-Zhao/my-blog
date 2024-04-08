import {Button, Card, Form, Input, message} from "antd";
import styled from "styled-components";
import logo from "@/assets/logo.png";
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/moudles/user.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {userRegister} from "@/apis/user.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState('login')
    const userLogin = async (values) => {
        await dispatch(fetchLogin(values));
        navigate("/");
        message.success("登录成功");
    };
    const registerUser = async (values) => {
        const params = {...values, confirmPassword: undefined}
        const res = await userRegister(params)
        message.success("注册成功");
        setType('login')
    }
    return (
        <LoginContainer>
            <LoginCard bordered={false}>
                <LogoImg className="login-logo" src={logo} alt=""/>
                {type === 'login' && <Form onFinish={userLogin} validateTrigger="onBlur">
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
                        <Input.Password size="large" placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                        <Button type="link" size="large" style={{float: "right"}}
                                onClick={() => setType('register')}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>}
                {type === 'register' && <Form onFinish={registerUser} validateTrigger="onBlur">
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
                        <Input.Password size="large" placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "请输入确认密码",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="请输入确认密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Register
                        </Button>
                        <Button type="link" size="large" style={{float: "right"}} onClick={() => setType('login')}>
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>}
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
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
`;

const LogoImg = styled.img`
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
`;

export default Login;
