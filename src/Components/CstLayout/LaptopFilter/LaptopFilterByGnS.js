import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const LaptopGnSdata =[
    {title: "Intel 8th Gen" , key: "i8gen"},
    {title: "Intel 9th Gen" , key: "i9gen"},
    {title: "Intel 10th Gen" , key: "i10gen"},
    {title: "Intel 11th Gen" , key: "i11gen"},
    {title: "Intel 12th Gen" , key: "i12gen"},
    {title: "Ryzen 3000 series" , key: "r3000s"},
    {title: "Ryzen 4000 series" , key: "r4000s"},
    {title: "Ryzen 5000 series" , key: "r5000s"},
]

const LaptopFilterByGnS = () => {
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
        dataSource={LaptopGnSdata}
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

export default LaptopFilterByGnS