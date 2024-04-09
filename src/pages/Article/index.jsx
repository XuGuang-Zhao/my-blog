import {Link, useNavigate} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, Row, Col} from 'antd'
import {Table, Tag, Space} from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from '@/hooks/useChannel'
import {useEffect, useState} from 'react'
import {delArticleAPI, getArticleListAPI} from '@/apis/article'
import styled from "styled-components";

const {Option} = Select
const {RangePicker} = DatePicker

const BreadCrumbContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 56px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
`
const MyForm = styled(Form)`

`
const MyTable = styled(Table)`
    .ant-table-body {
        height: calc(100vh - 360px);
    }
`


const Article = () => {
    const navigate = useNavigate()
    const {channelList} = useChannel()
    const status = {
        1: <Tag color='warning'>待审核</Tag>,
        2: <Tag color='success'>审核通过</Tag>,
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}
                                onClick={() => navigate(`/publish?id=${data.id}`)}/>
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗?"
                            onConfirm={() => onConfirm(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })

    // 获取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getArticleListAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }

        getList()
    }, [reqData])


    const onFinish = (formValue) => {
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
    }

    // 分页
    const onPageChange = (page) => {
        setReqData({
            ...reqData,
            page
        })
    }

    // 删除
    const onConfirm = async (data) => {
        await delArticleAPI(data.id)
        setReqData({
            ...reqData
        })
    }

    return (
        <div style={{padding: '0 24px', height: '100%'}}>
            <BreadCrumbContainer>
                <Breadcrumb
                    items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}
                    style={{margin: '10px 0'}}
                />
            </BreadCrumbContainer>

            <MyForm layout="inline" initialValues={{status: ''}} onFinish={onFinish}>
                <Form.Item label="状态" name="status">
                    <Radio.Group>
                        <Radio value={''}>全部</Radio>
                        <Radio value={1}>待审核</Radio>
                        <Radio value={2}>审核通过</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="频道" name="channel_id">
                    <Select
                        placeholder="请选择文章频道"
                        allowClear={true}
                        style={{minWidth: '230px'}}
                    >
                        {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="日期" name="date">
                    <RangePicker/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        筛选
                    </Button>
                </Form.Item>
            </MyForm>

            <MyTable
                style={{marginTop: '20px'}} rowKey="id" columns={columns}
                dataSource={list}
                pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }}
                scroll={{y: "calc(100vh - 360px)"}}
            />

        </div>
    )
}

export default Article