import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import baseUrl from "../url";

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

const Orders = () => {

  let unfiledOrders, filledOrders, allOrders;

  async function getOrders () {
    const user = JSON.parse(localStorcreateTime["user"]);
    try {
      const res = axios.get(
        baseUrl + "/api/getOrders?id=" + user[0]['id']
      );
      toast.promise(res, {
        loading: "数据加载中...",
        success: "加载成功！",
        error: "加载失败！"
      })
      const resData = await res;
      const orders = resData.data;
      unfiledOrders = res.data['unfilledOrders'];
      filledOrders = res.data['filledOrders'];
      allOrders = res.data['allOrders'];
    }
    catch (e) {
      console.log(e);
    }
    console.log("orders")
  }

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
  const columns = [
    {
      title: '菜名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ...getColumnSearchProps('name'),
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
      title: "截止时间",
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
  ];

    const tabItems = [
        {
          key: '1',
          label: `未完成订单`,
          children: <Table size="medium" columns={columns} dataSource={data} scroll={{ y: 240 }}/>,
        },
        {
          key: '2',
          label: `已完成订单`,
          children: `Content of Tab Pane 2`,
        },
        {
          key: '3',
          label: `全部`,
          children: `Content of Tab Pane 3`,
        },
      ];

      useEffect(() => {
        getOrders()
      }, [])

    return (
        <div>
          <Toaster/>
            <Tabs
                defaultActiveKey="1"
                className="order-table"
                type="card"
                // size={size}
                items={tabItems}
              />
        </div>
    )
}

export default Orders;