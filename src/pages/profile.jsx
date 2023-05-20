import React, { useEffect, useState } from "react";
import { Input, Form, Button, Avatar, Modal, Popconfirm, Space } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import baseUrl from "../url";

const Profile = () => {
    if (!localStorage['user']) {
        toast((t) => (
            <span>
              您好，请登录！
              <button onClick={() => window.location.href="/login"}>
                登录
              </button>
            </span>
          ));
        return (
            <div className="form-container">
                <h1>您好，请登录！</h1>
                <Toaster/>
            </div>
        )
    }
    else {
        // 个人信息相关变量以及函数
        const [form] = Form.useForm();
        const user = JSON.parse(localStorage["user"]);
        const [editFields, setEditFields] = useState({
            nickname: false,
            phone: false,
            address: false,
        });

        const [detail, setDetail] = useState({
            nickname: user[0]['nickname'],
            phone: user[0]['phone_number'],
            address: user[0]['address']
        });

        const handleEdit = (field) => {
            setEditFields({ ...editFields, [field]: true });
        };

        const handleSubmit = async (values) => {
            try {
                const postChangeData = await axios.post(
                    baseUrl + "/api/changeUser", 
                    {
                        nickname: values['nickname'],
                        phoneNumber: values['phone'],
                        address: values['address'],
                        id: user[0]['id']
                    }
                );
                if (postChangeData.data['message'] == 'success') {
                
                    // console.log(values);
                    setDetail(prevDetail => ({
                        ...prevDetail,
                        nickname: values['nickname'],
                        phone: values['phone'],
                        address: values['address']
                    }));
                    console.log("details:", detail);
                    setEditFields({ nickname: false, phone: false, address: false });
                    form.setFieldsValue({ 
                        nickname: values['nickname'],
                        phone: values['phone'],
                        address: values['address']
                    });
                    toast.success("修改成功！");
                    localStorage.setItem('user', JSON.stringify(postChangeData.data['user']));
                    form.validateFields();
                }
                else {
                    toast.error("修改失败！");
                }
            }
            catch (e) {
                toast.error('网络错误，请检查网络');
            }
        };

        // 修改密码的modal变量及相关函数
        const [openModal, setOpenModal] = useState(false);
        const [confirmLoading, setConfirmLoading] = useState(false);
        const [passwdForm] = Form.useForm();

        const showModal = async () => {
            setOpenModal(() => true);
        }
        
        const handleOk = async () => {
            setConfirmLoading(() => true);
            let newValues = await passwdForm.validateFields()
            passwdForm.resetFields();
            console.log(newValues);
            if (newValues['password'] != newValues['repassword']) {
                toast.error("两次输入的密码不一致！");
            }
            else if (newValues['oldpass'] == newValues['password']) {
                toast.error("新密码不能与旧密码相同！");
            }
            else {
                try {
                    let changepsd = await axios.post(
                        baseUrl + "/api/changePasswd", 
                        {
                            id: user[0]['id'],
                            oldpasswd: newValues['oldpass'],
                            passwd: newValues['password'],
                            repasswd: newValues['repassword']
                        }
                    );
                    if (changepsd.data['message'] == "success") {
                        toast.success("修改成功！");
                    }
                    else if (changepsd.data['message'] == "error") {
                        toast.error(changepsd.data['data']);
                    }
                    else {
                        toast.error("修改失败！");
                    }
                }
                catch (e) {
                    toast.error("网络错误！");
                    setConfirmLoading(() => false);
                }
            }
            setConfirmLoading(() => false);
        };

        const handleCancel = async () => {
            setOpenModal(() => false);
        }

        const becomeVIP = async () => {
            try {
                let vipData = await axios.post(
                    baseUrl + '/api/becomeVIP',
                    {
                        userId: user[0]['id'],
                    }
                );
                if (vipData.data == 'success') {
                    toast.success("恭喜，您已成为尊贵的VIP会员！");
                }
                else {
                    toast.error("开通失败");
                }
            }
            catch (e) {
                console.log(e);
                toast.error("网络错误");
            }
        }

        useEffect(
            () => {
                console.log('useEffect: ', user, detail)
            }, [detail]
        )

        return (
            <div className="form-container" onClick={null}>
                <Toaster/>
                <div style={{ width: "60%", minWidth: "500px", maxWidth: "800px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div style={{ marginLeft: "20px", color: "white"}}>
                            {
                                user[0]['isVIP'] ? 
                                <h2 style={{ margin: 0 }}>
                                    您好，尊贵的VIP会员  {detail["nickname"]}
                                </h2>
                                :
                                <h2>
                                    您好，{detail["nickname"]}
                                    <Popconfirm
                                        title="确定要升级为VIP会员吗？"
                                        onConfirm={becomeVIP}
                                        okText="是"
                                        cancelText="否"
                                    >
                                        <Button type="link" >开通会员</Button>
                                    </Popconfirm>
                                </h2>
                            }
                            {/* <p style={{ margin: 0 }}>{user[0]["id"]}</p> */}
                        </div>
                    </div>
                    <Form 
                        form={form} 
                        onFinish={handleSubmit} 
                        labelCol={{ span: 4 }} 
                        style={{color: "white"}} 
                    >
                    <Form.Item
                        label="用户名"
                        // style={{color: "white"}}
                        name="nickname"
                        initialValue={user[0]["nickname"]}
                        rules={[{ required: false, message: "请输入用户名" }]}
                    >
                        {editFields.nickname ? (
                        <Input />
                        ) : (
                        <div onClick={() => handleEdit("nickname")}>
                            {detail["nickname"]} <UserOutlined />
                        </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        initialValue={user[0]["phone_number"]}
                        rules={[              
                            { required: false, message: "请输入手机号" },              
                            { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                        ]}
                    >
                        {editFields.phone ? (
                        <Input />
                        ) : (
                        <div onClick={() => handleEdit("phone")}>
                            {detail["phone"]} <PhoneOutlined />
                        </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="家庭住址"
                        name="address"
                        initialValue={user[0]["address"]}
                        rules={[{ required: false, message: "请输入家庭住址" }]}
                    >
                        {editFields.address ? (
                        <Input />
                        ) : (
                        <div onClick={() => handleEdit("address")}>
                            {detail["address"]} <HomeOutlined />
                        </div>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        {
                            !!(editFields.address + editFields.nickname + editFields.phone) 
                            && 
                            <Button type="primary" htmlType="submit" className="connect-DB-button" style={{marginBottom: 5}}>
                            保存
                            </Button>
                        }
                    </Form.Item>
                    </Form>
                    <Button type="primary" block className="connect-DB-button" onClick={showModal}>
                    修改密码
                    </Button>
                </div>
                <Modal
                    title="修改密码"
                    open={openModal}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okText="确认修改"
                    cancelText="取消"
                >
                    <Form
                        form={passwdForm}
                        name="basic"
                        labelCol={{span: 8,}}
                        wrapperCol={{span: 16,}}
                        style={{maxWidth: 600}}
                        onFinish={null}
                        onFinishFailed={null}
                    >
                        <Form.Item
                        label="原密码"
                        name="oldpass"
                        rules={[
                            {
                            required: true,
                            message: '请输入原密码!',
                            },
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        label="新密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码!',
                            },
                            {
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                message: "密码应包含字母、数字和特殊字符，并且至少8位"
                            }
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        label="确认密码"
                        name="repassword"
                        rules={[
                            {
                            required: true,
                            message: '请确认密码!',
                            },
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    };
}

export default Profile;