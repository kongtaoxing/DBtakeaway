import React from "react";
import { Tabs } from "antd";

const Orders = () => {

    const items = [
        {
          key: '1',
          label: `未完成订单`,
          children: `Content of Tab Pane 1`,
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

    return (
        <div className="form">
            <Tabs
                defaultActiveKey="1"
                type="card"
                // size={size}
                items={items}
              />
        </div>
    )
}

export default Orders;