import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const LaptopRamData =[
    {title: "2 GB" , key: "2gb"},
    {title: " GB" , key: "4gb"},
    {title: " GB" , key: "6gb"},
    {title: " GB" , key: "8gb"},
    {title: "1 GB" , key: "12gb"},
    {title: "1 GB" , key: "16gb"},
    {title: "3 GB" , key: "32gb"},
    {title: "6 GB" , key: "64gb"},
    {title: "12 GB" , key: "128gb"},
]

const LaptopFilterByRam = () => {

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
        dataSource={LaptopRamData}
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
  

export default LaptopFilterByRam;