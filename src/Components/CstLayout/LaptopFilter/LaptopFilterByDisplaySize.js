import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const LaptopDisplayData =[
    { title: "13 inch to 13.9 inch" , key: "xsmall"},
    { title: "14 inch to 14.9 inch" , key: "small"},
    { title: "15 inch to 15.9 inch" , key: "medium"},
    { title: "16 inch to 16.9 inch" , key: "large"},
    { title: "17 inch to 17.9 inch" , key: "xlarge"},
]

const LaptopFilterByDisplaySize = (params) => {
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
        dataSource={LaptopDisplayData}
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

export default LaptopFilterByDisplaySize;