import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tabs, Layout, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import axios, { all } from "axios";
import { toast, Toaster } from "react-hot-toast";

import baseUrl from "../url";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";


const Orders = () => {

  // let unfiledOrders = [], filledOrders = [], allOrders, allData, filledData, unfilledData;
  const [unfiledOrders, setUnfilledOrders] = useState([]);  // 已完成订单
  const [filledOrders, setFilledOrders] = useState([]);  // 未完成订单
  const [allOrders, setAllOrders] = useState([]);  // 全部订单
  const [allData, setAllData] = useState([]);  // 全部订单表格数据
  const [filledData, setFilledData] = useState([]);  // 已完成订单表格数据
  const [unfilledData, setUnfilledData] = useState([]);  // 未完成订单表格数据

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [delivering, setDelivering] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // getOrders();
  // 表格属性
  const columns = [
    {
      title: "订单ID",
      dataIndex: 'orderId',
      key: "orderId",
      width: 100,
      sorter: (a, b) => a.orderId - b.orderId,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('orderId')
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      ...getColumnSearchProps('createTime'),
      sorter: (a, b) => new Date(a.createTime.replace('年', '-').replace('月', '-').replace('日', '')) - new Date(b.createTime.replace('年', '-').replace('月', '-').replace('日', '')),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "配送时间",
      dataIndex: 'endTime',
      key: 'endTime',
      width: 200,
      // ...getColumnSearchProps('endTime'),
      // sorter: (a, b) => {
      //   const endTimeA = a.endTime || ''; // 处理空值
      //   const endTimeB = b.endTime || '';
      //   return new Date(endTimeA.replace('年', '-').replace('月', '-').replace('日', '')) - new Date(endTimeB.replace('年', '-').replace('月', '-').replace('日', ''));
      // },
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: '配送地址',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 200
    }
  ];

  // 分页属性
  const tabItems = [
      {
        key: '1',
        label: `未完成订单`,
        children: 
        <Table
          size="medium" 
          columns={columns} 
          dataSource={unfilledData} 
          scroll={{ y: 240, x: '100%' }}
        />,
      },
      {
        key: '2',
        label: `已完成订单`,
        children: 
        <Table
          size="medium" 
          columns={columns} 
          dataSource={filledData} 
          scroll={{ y: 240, x: '100%' }}
        />,
      },
      {
        key: '3',
        label: `全部`,
        children: 
        <Table
          size="medium" 
          columns={columns} 
          dataSource={allData} 
          scroll={{ y: 240, x: '100%' }}
        />,
      },
    ];

  // 处理orders对象
  function expandObj(data, menuItem) {
    // console.log('menu item', menuItem);
    for (let key in data) {
      if (typeof data[key] === "object" && data[key] !== null) {
        const subData = data[key];
        for (let subKey in subData) {
          data[subKey] = subData[subKey];
        }
        delete data[key];
      }
    }
    data['detail'] = {};
    for (var i = 0; i < menuItem.length; i++) {
      // console.log('data', data);
      // console.log('data i', data[menuItem[i]]);
      if (data[menuItem[i]]) {
        data['detail'][menuItem[i]] = data[menuItem[i]];
      }
      delete data[menuItem[i]];
    }
    // console.log('处理前', menuItem, '处理后', data)
    return data;
  }

  // 确认订单
  const confirmOrder = async (orderId) => {
    let riderGotOrderOrNot = allOrders.filter(order => ((order['delivered'] == true || order['delivered'] == false) && order['id'] == orderId));
    if (riderGotOrderOrNot.length > 0) {
      try {
        let confirmData = await axios.post(
          baseUrl + '/api/confirm',
          {
            userId: JSON.parse(localStorage["user"])[0]['id'],
            dataTime: new Date(),
            orderId: orderId,
          }
        );
        if (confirmData.data['message'] == 'success') {
          toast.success('确认成功!');
        }
        else {
          toast.error('确认失败！');
        }
      }
      catch (e) {
        console.log(e);
        toast.error("网络错误");
      }
    }
    else {
      toast("请先等待骑手接单", 
      {
        icon: 'ℹ️'
      }
      );
    }
  }

  // 查看订单详情
  const checkUnfillOrderDetail = async (orderId) => {
    setAllOrders((prevOrders) => {
      // 在此处获取最新的 allOrders 值并进行操作
      const values = prevOrders.filter(order => order['id'] == orderId)[0]['detail'];
      console.log(values);
      const detail = Object.keys(values).reduce((acc, val) => acc + val + '*' + values[val] + '，', '');
      setOpenModal(() => true);
      setModalText(() => detail);
      
      let riderGotOrderOrNot = allOrders.filter(order => ((order['delivered'] == true || order['delivered'] == false) && order['id'] == orderId));
      console.log('got?', riderGotOrderOrNot == [])
      riderGotOrderOrNot != false ? setDelivering(() => "骑手已接单") : setDelivering(() => "骑手未接单");
  
      // 返回更新后的 allOrders 值
      return prevOrders;
    });
  };
  

  const checkOrderDetail = async (orderId) => {
    setAllOrders((prevOrders) => {
      // 在此处获取最新的 allOrders 值并进行操作
      const values = prevOrders.filter(order => order['id'] == orderId)[0]['detail'];
      console.log(values);
      const detail = Object.keys(values).reduce((acc, val) => acc + val + '*' + values[val] + '，', '');
      setOpenModal(() => true);
      setModalText(() => detail);
  
      // 返回更新后的 allOrders 值
      return prevOrders;
    });
  };
  

  const destroyModal = async () => {
    setOpenModal(() => false);
    setModalText(() => '');
    setDelivering(() => "");
  }

  useEffect(() => {
    async function getOrders () {
      const user = JSON.parse(localStorage["user"]);
      try {
        const response = await axios.get(baseUrl+ '/api/menu');
        let tempMenuItem = [];
        for (let i = 0; i < response.data.length; i++) {
          tempMenuItem.push(response.data[i]['dishes']);
        }
        // console.log(tempMenuItem)
        const res = axios.get(
          baseUrl + "/api/getOrders?id=" + user[0]['id']
        );
        toast.promise(res, {
          loading: "数据加载中...",
          success: "加载成功！",
          error: "加载失败！"
        })
        const resData = await res;
        const orders = resData.data['orders'];

          ////////////
         // 修改前 //
        ///////////
        // // allOrders = resData.data['orders'];
        // setAllOrders(resData.data['orders']);
        // for ( var i = 0; i < allOrders.length; i++) {
        //   allOrders[i] = expandObj(allOrders[i], tempMenuItem);
        // }
        // // console.log(allOrders);
        // for ( var i = 0; i < allOrders.length; i++) {
        //   // console.log(allOrders[i])
        //   if (allOrders[i]['delivered'] == true) {
        //     // console.log(allOrders[i])
        //     // filledOrders.push(allOrders[i]);
        //     setFilledOrders(prevOrders => [...prevOrders, allOrders[i]]);
        //   }
        //   else {
        //     // unfiledOrders.push(allOrders[i]);
        //     setUnfilledOrders(prevOrders => [...prevOrders, allOrders[i]]);
        //   }
        // }
        // console.log('三种订单们', allOrders, unfiledOrders, filledOrders);
        // setAllData(allOrders.map((item, index) => ({
        //   key: (index + 1).toString(),
        //   orderId: item.id,
        //   createTime: item.create_time,
        //   endTime: item.endTime,
        //   address: item.address,
        // })));
        // setFilledData(filledOrders.map((item, index) => ({
        //   key: (index + 1).toString(),
        //   orderId: item.id,
        //   createTime: item.create_time,
        //   endTime: item.endTime,
        //   address: item.address,
        // })));
        // setUnfilledData(unfiledOrders.map((item, index) => ({
        //   key: (index + 1).toString(),
        //   orderId: item.id,
        //   createTime: item.create_time,
        //   endTime: item.endTime,
        //   address: item.address,
        //   option: 
        //   <Space>
        //     <Button size="small" type="primary" onClick={null}>查看详情</Button> 
        //     <Popconfirm
        //       title="是否确认订单？" 
        //       onConfirm={() => confirmOrder(item.id)} 
        //       okText="是" 
        //       cancelText="否"
        //     >
        //       <Button size="small" type="primary" >确认订单</Button>
        //     </Popconfirm>
        //   </Space>
        // })));
        // console.log(allData)

          ////////////
         // 修改后 //
        ///////////
        setAllOrders(orders);

        const expandedOrders = orders.map(order => expandObj(order, tempMenuItem));

        const newFilledOrders = expandedOrders.filter(order => order['delivered'] === true);
        const newUnfilledOrders = expandedOrders.filter(order => order['delivered'] !== true);

        setFilledOrders(newFilledOrders);
        setUnfilledOrders(newUnfilledOrders);

        const allData = expandedOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: new Date(item.create_time).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }),
          endTime: item.endTime ? new Date(item.endTime).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }) : null,
          address: item.address,
          option:
          <Button size="small" type="primary" onClick={() => checkOrderDetail(item.id)}>
            查看详情
          </Button>
        }));

        setAllData(allData);

        const filledData = newFilledOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: new Date(item.create_time).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }),
          endTime: item.endTime ? new Date(item.endTime).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }) : null,
          address: item.address,
          option: 
          <Button size="small" type="primary" onClick={() => checkOrderDetail(item.id)}>
            查看详情
          </Button>
        }));

        setFilledData(filledData);

        const unfilledData = newUnfilledOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: new Date(item.create_time).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }),
          endTime: item.endTime ? new Date(item.endTime).toLocaleString("zh-CN", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',timeZone: 'Asia/Shanghai' }) : null,
          address: item.address,
          option: (
            <Space>
              <Button size="small" type="primary" onClick={() => checkUnfillOrderDetail(item.id)}>
                查看详情
              </Button>
              <Popconfirm
                title="是否确认订单？"
                onConfirm={() => confirmOrder(item.id)}
                okText="是"
                cancelText="否"
              >
                <Button size="small" type="primary">
                  确认订单
                </Button>
              </Popconfirm>
            </Space>
          ),
        }));

        setUnfilledData(unfilledData);
      }
      catch (e) {
        console.log(e);
      }
      // console.log("orders")
    }
    // getOrders();
    toast.promise(getOrders(), {
      loading: "数据加载中...",
      success: "加载成功！",
      error: "加载失败！"
    })
    // console.log('menu item', menuItem)
  }, [])

  return (
      <div>
        <Toaster/>
        <Layout>
        <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
          <Content>
            <Tabs
              defaultActiveKey="1"
              className="order-table"
              type="card"
              animated="true"
              items={tabItems}
              style={{ width: '100%' }}
            />
            <Modal 
              title="订单详情" 
              open={openModal} 
              onOk={destroyModal} 
              onCancel={destroyModal}
              okText="确定"
              cancelText="取消"
            >
              <p>{modalText}</p>
              <p>{delivering}</p>
            </Modal>
            </Content>
          <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
        </Layout>
      </div>
  )
}

export default Orders;