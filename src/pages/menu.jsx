import React, { useEffect, useState } from "react";
import { Carousel, Avatar, List, Space, Divider, Skeleton, Layout, Image, Select, InputNumber, Button } from "antd";
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

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const Menupage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState({});
  const [settle, setSettle] = useState(false);
  const [priceSum, setPriceSum] = useState(0);

  const isVIP = JSON.parse(localStorage["user"])[0]['isVIP'];

  const loadMoreData = () => {
    if (loading) {
      return;
    }
  }

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
    // 
  }

  // 每次重新渲染的时候载入menu
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl+ '/api/menu');
        setData(() => response.data);
        toast.success("数据加载成功！");
      }
      catch (e) {
        toast.error("数据加载出错，请检查网络设置！");
      }
    };
    fetchData();
  }, []);

  console.log(data);

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
              next={loadMoreData}
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
                        <Avatar src={sale} />
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
                  <Button type="primary" onClick={handleSubmitOrder}>
                    点击结算
                  </Button>
                </div>
              </div>
            </Footer>
          }
        </Layout>
        <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
      </Layout>
    </div>
  );
};

export default Menupage;