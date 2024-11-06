import { List } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState }  from 'react'

const storageData = [
    {title: "2 GB", key:"2"},
    {title: "4 GB", key:"4"},
    {title: "8 GB", key:"8"},
    {title: "1 GB6", key:"16"},
    {title: "32 GB", key:"32"},
    {title: "64 GB", key:"64"},
    {title: "128 GB", key:"128"},
    {title: "256 GB", key:"256"},
    {title: "512 GB", key:"512"},
  ];
  

const FilterByStorage = () => {
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
    <List GB
      dataSource={storageData}
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

export default FilterByStorage;