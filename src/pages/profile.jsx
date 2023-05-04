import React, { useEffect, useState } from "react";
import { Input, Form, Button, Avatar } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

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
                    "http://localhost:3000/api/changeUser", 
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

        useEffect(
            () => {
                console.log('useEffect: ', user, detail)
            }, [detail]
        )

        return (
            <div className="form-container" onClick={null}>
                <div style={{ width: "60%", minWidth: "500px", maxWidth: "800px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div style={{ marginLeft: "20px", color: "white"}}>
                            <h2 style={{ margin: 0 }}>{detail["nickname"]}</h2>
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
                    <Toaster/>
                    <Button type="primary" block className="connect-DB-button">
                    修改密码
                    </Button>
                </div>
            </div>
        );
    };
}

export default Profile;