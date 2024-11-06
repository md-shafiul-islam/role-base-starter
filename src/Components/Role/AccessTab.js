import { Radio, Tabs } from "antd";
import React, { useState } from "react";

import RoleAccessItem from "@/src/Components/Role/RoleAccessItem";

const AccessTab = ({ roleId, access = [], ...props }) => {
  const [mode, setMode] = useState("left");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="left">Vertical</Radio.Button>
        <Radio.Button value="top">Horizontal</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey={"category"}
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={access.map((item, i) => {
          return {
            label: <span>{item?.title}</span>,
            key: item?.key,
            children: (
              <div className="flex flex-col gap-5">
                <h2 className="border-b border-gray-400 py-1">{item?.title}</h2>
                <RoleAccessItem item={item} id={roleId} />
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default AccessTab;
