import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tabs, Layout } from 'antd';
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
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('orderId')
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      ...getColumnSearchProps('createTime'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "配送时间",
      dataIndex: 'endTime',
      key: 'endTime',
      width: 200,
      ...getColumnSearchProps('endTime')
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

// 表格数据
  const data = [
    {
      key: '1',
      name: 'John Brown',
      createTime: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Joe Black',
      createTime: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      createTime: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      createTime: 32,
      address: 'London No. 2 Lake Park',
    },
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
        // const orders = resData.data;
        // allOrders = resData.data['orders'];
        setAllOrders(resData.data['orders']);
        for ( var i = 0; i < allOrders.length; i++) {
          allOrders[i] = expandObj(allOrders[i], tempMenuItem);
        }
        console.log(allOrders);
        for ( var i = 0; i < allOrders.length; i++) {
          // console.log(allOrders[i])
          if (allOrders[i]['delivered'] == true) {
            // console.log(allOrders[i])
            // filledOrders.push(allOrders[i]);
            setFilledOrders(prevOrders => [...prevOrders, allOrders[i]]);
          }
          else {
            // unfiledOrders.push(allOrders[i]);
            setUnfilledOrders(prevOrders => [...prevOrders, allOrders[i]]);
          }
        }
        console.log(unfiledOrders, filledOrders);
        setAllData(allOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: item.create_time,
          endTime: item.endTime,
          address: item.address,
        })));
        setFilledData(filledOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: item.create_time,
          endTime: item.endTime,
          address: item.address,
        })));
        setUnfilledData(unfiledOrders.map((item, index) => ({
          key: (index + 1).toString(),
          orderId: item.id,
          createTime: item.create_time,
          endTime: item.endTime,
          address: item.address,
        })));
        console.log(data, allData)
      }
      catch (e) {
        console.log(e);
      }
      // console.log("orders")
    }
    getOrders();
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
            </Content>
          <Sider breakpoint="xs" collapsedWidth={0} style={{ overflow: 'hidden', transition: 'width 0.3s' }}></Sider>
        </Layout>
      </div>
  )
}

export default Orders;