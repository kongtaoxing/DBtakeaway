import React from "react";
import { Tabs } from "antd";

const Orders = () => {

    const items = [
        {
          key: '1',
          label: `Tab 1`,
          children: `Content of Tab Pane 1`,
        },
        {
          key: '2',
          label: `Tab 2`,
          children: `Content of Tab Pane 2`,
        },
        {
          key: '3',
          label: `Tab 3`,
          children: `Content of Tab Pane 3`,
        },
      ];

    return (
        <div className="form-container">
            <Tabs defaultActiveKey="1" items={items} onChange={null} />
        </div>
    )
}

export default Orders;