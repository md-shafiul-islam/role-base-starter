import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const LaptopProcessorTypeData=[
    {title: "Apple", key: "apple"},
    {title: "Intel", key: "intel"},
    {title: "AMD", key: "amd"},
    {title: "Microsoft", key: "microsoft"},
]

const LaptopFilterByProcessorType = () => {
  
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
        dataSource={LaptopProcessorTypeData}
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

export default LaptopFilterByProcessorType;