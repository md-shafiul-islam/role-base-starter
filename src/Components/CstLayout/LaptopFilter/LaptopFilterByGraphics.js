import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const FilterGraphicsData =[
    {title:"Shared/Integrated", key: "shared"},
    {title:"Dedicated 2 GB", key: "dedicated2"},
    {title:"Dedicated 3 GB", key: "dedicated3"},
    {title:"Dedicated 4 GB", key: "dedicated4"},
    {title:"Dedicated 6 GB", key: "dedicated6"},
    {title:"Dedicated 8 GB", key: "dedicated8"},
    {title:"Dedicated 10 GB", key: "dedicated10"},
    {title:"Dedicated 12 GB", key: "dedicated12"},
    {title:"Dedicated 12 GB +", key: "dedicated12above"},
];

const LaptopFilterByGraphics = () => {
    const [checkedItems, setCheckedItems] = useState([]);

    const listChangeAction = (value) => {
        const items = [];
    if(checkedItems.includes(value)){
        items= checkedItems.filter((item) => item !== value );
    } else{
        items = [value, ...checkedItems];
    }
    setCheckedItems(items);
    };
    

    const isChecked = (value) => {
        if (checkedItems.includes(value)){
            return true;
        }
        return false;
    }
    

  return (
    <>
        <List
        dataSource={FilterGraphicsData}
        renderItem={(item) => {
            return (
                <>
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
                </>
            );
        }}
        />

        
    </>
  );
};

export default LaptopFilterByGraphics;