import { Card, Checkbox, Col, List, Row  } from 'antd';
import React, { useState } from 'react'

const ramData = [
  {title: "2 GB", key:"2"},
  {title: "4 GB", key:"4"},
  {title: "6 GB", key:"6"},
  {title: "8 GB", key:"8"},
  {title: "12 GB", key:"12"},
  {title: "16 GB", key:"16"},
  {title: "18 GB", key:"18"},
  {title: "32 GB", key:"32"},
  {title: "64 GB", key:"64"},
  {title: "128 GB", key:"128"},
  {title: "256 GB", key:"256"},
  {title: "512 GB", key:"512"},
];

  const FilterByRam = (params) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const listChangeAction = (value ) =>{
      const items=[];
      if(checkedItems.includes(value)){
        items = checkedItems.filter((item) => item !== value);
      }
      else{
        items = [value, ...checkedItems];
    }
      setCheckedItems(items);
    };
    const isChecked = (value) => {
      if (checkedItems.includes(value)) {
        return true;
      }
      return false;
    };

  return (
    <React.Fragment>
    <List
      dataSource={ramData}
      renderItem={(item) => {
        return (
          <React.Fragment>
            <List.Item>
              <Checkbox
                checked={isChecked(item?.key)}
                onChange={() => {
                  listChangeAction(item?.key);
                }}
              >
                {item?.title}
              </Checkbox>
              
            </List.Item>
          </React.Fragment>
        );
      }}
    />
  </React.Fragment>
  )
}

export default FilterByRam;
