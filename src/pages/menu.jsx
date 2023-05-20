import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../myContext";
import { 
  Carousel, 
  Avatar, 
  List, 
  Space, 
  Divider, 
  Skeleton, 
  Layout, 
  Image, 
  Select, 
  InputNumber, 
  Button,
  Modal,
  FloatButton
 } from "antd";
import { 
  StarOutlined, 
  LikeOutlined, 
  MessageOutlined,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import menuImage from "/src/image/menu.png";
import sale from "/src/image/sale.png";
import axios from "axios";
import baseUrl from "../url";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const Menupage = () => {
  // const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);  // menu中的数据
  const [values, setValues] = useState({});  // 每种菜品的数量
  const [settle, setSettle] = useState(false);  // 是否展示结算框
  const [priceSum, setPriceSum] = useState(0);  // 总价格

  const { menuItem, setMenuItem } = useContext(MyContext);
  const navigate = useNavigate();

  const isVIP = localStorage["user"] ? JSON.parse(localStorage["user"])[0]['isVIP'] : false;

  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  // }

  // 动态渲染计算总价格
  const calculateSum = async (dishes, value) => {
    setValues(prevValues => {
      const newValues = {
        ...prevValues,
        [dishes]: value
      };
    
      const valuesSum = Object.values(newValues).reduce((acc, value) => acc + value, 0);
      setSettle(valuesSum > 0);
    
      console.log("Numbers of dishes:", newValues);
    
      if (!isVIP) {
        let sum = Object.keys(newValues).reduce((acc, key) => {
          const dish = data.find(item => item.dishes === key);
          if (dish) {
            return acc + (newValues[key] * dish.price);
          }
          return acc;
        }, 0);
        setPriceSum(sum);
      }
      else {
        let sum = Object.keys(newValues).reduce((acc, key) => {
          const dish = data.find(item => item.dishes === key);
          if (dish) {
            return acc + (newValues[key] * dish.VIPprice);
          }
          return acc;
        }, 0);
        setPriceSum(sum);
      }
    
      return newValues; // 返回更新后的对象
    });
  }
  
  // 提交订单
  const handleSubmitOrder = async () => {
    try {
      let postOrder = await axios.post(
        baseUrl + "/api/submitOrder",
        {
          userId: JSON.parse(localStorage["user"])[0]['id'],
          dataTime: new Date(),
          detail: values,
          sum: priceSum
        }
      );
      if (postOrder.data['message'] == 'success') {
        toast.success("订单提交成功！");
        setOpenModal(() => false);
      }
      else {
        toast.error("订单提交失败！");
      }
    }
    catch (e) {
      console.log(e);
      toast.error("网络错误！");
    }
  }

  // 每次重新渲染的时候载入menu
  useEffect (() => {
    
    if (!localStorage["user"]) {
      toast(
        <span>
          您好，请登录！
          <button onClick={() => navigate('/login')}>
            登录
          </button>
        </span>
      );
    }
    else {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl+ '/api/menu');
          setData(() => response.data);
          toast.success("数据加载成功！");
          let tempMenuItem = [];
          for (let i = 0; i < response.data.length; i++) {
            tempMenuItem.push(response.data[i]['dishes']);
          }
          setMenuItem(() => tempMenuItem);
        }
        catch (e) {
          toast.error("数据加载出错，请检查网络设置！");
        }
      };
      fetchData();
    }
  }, []);

  // console.log(data);

  if (localStorage["user"]) {
    return (
      <div
        id="scrollableDiv"
        style={{
          height: 700,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <Toaster/>
        <Layout>
          <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
          <Layout>
            <Content>
              <InfiniteScroll
                dataLength={data.length}
                // next={loadMoreData}
                hasMore={data.length < 50}
                // loader={
                //   <Skeleton
                //     avatar
                //     paragraph={{
                //       rows: 1,
                //     }}
                //     active
                //   />
                // }
                endMessage={<Divider plain>全部加载完毕！ 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
              <Carousel autoplay>
                <div>
                  <Image width={750} src={menuImage}/>
                </div>
                <div>
                  <Image width={750} src={menuImage}/>
                </div>
                <div>
                  <Image width={750} src={menuImage}/>
                </div>
                <div>
                  <Image width={750} src={menuImage}/>
                </div>
              </Carousel>
              <List
                dataSource={data}
                split="true"
                footer={
                  <div>
                    <b>快点外卖</b> 菜单
                  </div>
                }
                // size="large"
                renderItem={(item) => (
                  <List.Item
                    key={item.dishes}
                    style={{ borderBottom: '1px solid white', height: '110px', display: 'flex', alignItems: 'center' }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={<Image src={"http://49.233.41.142/" + item.dishes + ".png"} />}
                          style={{ width: '50px', height: '50px' }}
                        />
                      }
                      title={
                        <p>
                          {item.onSale && <Avatar src={sale} />}
                          {item.dishes}
                        </p>
                      }
                      description={"价格：" + item.price + "元，VIP价格：" + item.VIPprice + "元"}
                    />
                  {/* <div>操作按钮</div> */}
                  <p>份数：</p>
                  <InputNumber defaultValue={0} max={99} min={0} onChange={(value) => calculateSum(item.dishes, value)}/>
                </List.Item>
              )}
              />
              </InfiniteScroll>
              <FloatButton.BackTop />
            </Content>
            {
              settle
              && 
              <Footer style={{ position: 'fixed', bottom: 0, width: '70.7%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    总价: {priceSum}
                  </div>
                  <div>
                    <Button type="primary" onClick={() => setOpenModal(true)}>
                      点击结算
                    </Button>
                    <Modal 
                      title="确认订单" 
                      open={openModal} 
                      onOk={handleSubmitOrder} 
                      onCancel={() => setOpenModal(false)}
                      okText="确认提交"
                      cancelText="取消"
                    >
                      <p>{Object.keys(values).reduce((acc, val) => acc + val + '*' + values[val] + '，', '')}总价{priceSum}元。</p>
                    </Modal>
                  </div>
                </div>
              </Footer>
            }
          </Layout>
          <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
        </Layout>
      </div>
    );
  }
  else {
    return (
      <div className="form-container">
          <Toaster/>
          <h1>您好，请登录！</h1>
      </div>
    )
  }
};

export default Menupage;