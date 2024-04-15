import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message,
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Link, useParams, useSearchParams} from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useEffect, useState} from "react";
import {createArticleApi, getArticleApi, getChannelAPI, updateArticleAPI} from "@/apis/article.js";

const ArticlePublish = () => {
    const {Option} = Select;
    const [channelList, setChannelList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [imageType, setImageType] = useState(0)
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    const [form] = Form.useForm()

    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI();
            setChannelList(res.data.channels);
        };
        getChannelList();
    }, []);


    useEffect(() => {
        async function getArticle() {
            const res = await getArticleApi(articleId)
            const {cover, ...formValue} = res.data
            form.setFieldsValue({...formValue, type: cover.type});
            setImageType(cover.type)
            setImageList(cover.images.map(url => {
                return {url}
            }))
        }

        if (articleId) {
            getArticle()
        }
    }, [articleId, form])

    const formSubmit = (formValue) => {
        const {channel_id, content, title} = formValue;
        const reqData = {
            title: title,
            content: content,
            cover: {
                type: imageType,
                image: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }),
            },
            channel_id: channel_id,
        };
        if (articleId) {
            updateArticleAPI({...reqData, id: articleId})
        } else {
            createArticleApi(reqData);
        }
    };

    const onUploadChange = (info) => {
        setImageList(info.fileList);
    };

    const onTypeChange = (e) => {
        setImageType(e.target.value);
    };

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb
                        items={[
                            {title: <Link to={"/"}>首页</Link>},
                            {title: "发布文章"},
                        ]}
                    />
                }
            >
                {/*提交表单*/}
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1}}
                    onFinish={formSubmit}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: "请输入文章标题"}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: "请选择文章频道"}]}
                    >
                        <Select placeholder="请选择文章频道" style={{width: 400}}>
                            {channelList.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onUploadChange}
                            maxCount={imageType}
                            fileList={imageList}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: "请输入文章内容"}]}
                        style={{height: 300}}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                            style={{height: 250}}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ArticlePublish;
