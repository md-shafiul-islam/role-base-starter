import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const LaptopProcessorModelData = [
    {title: "Intel CDC" , key:"cdc"},
    {title: "Intel PQC" , key:"pqc"},
    {title: "Intel Core i3" , key:"corei3"},
    {title: "Intel Core i5" , key:"corei5"},
    {title: "Intel Core i7" , key:"corei7"},
    {title: "Intel Core i9" , key:"corei9"},
    {title: "AMD Athlon" , key:"athlon"},
    {title: "AMD Ryzen 3" , key:"ryzen3"},
    {title: "AMD Ryzen 5" , key:"ryzen5"},
    {title: "AMD Ryzen 7" , key:"ryzen7"},
    {title: "AMD Ryzen 9" , key:"ryzen9"},
    {title: "Apple M1" , key:"m1"},
    {title: "Apple M1 Pro" , key:"m1pro"},
    {title: "Apple M1 Max" , key:"m1max"},
    {title: "Microsocft SQ 1" , key:"sq1"},
    {title: "Microsocft SQ 2" , key:"sq2"},

]

const LaptopFilterByProcessorModel = () => {
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
        dataSource={LaptopProcessorModelData}
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


export default LaptopFilterByProcessorModel