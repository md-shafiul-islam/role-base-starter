import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const FilterSSDdate =[
    {title: "128 GB", key: "128gb"},
    {title: "256 GB", key: "256tb"},
    {title: "512 GB", key: "512gb"},
    {title: "1 TB", key: "1tbssd"},
    {title: "2 TB", key: "2tbssd"},
]

const FilterLaptopBySSD = () => {
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
        dataSource={FilterSSDdate}
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


export default FilterLaptopBySSD