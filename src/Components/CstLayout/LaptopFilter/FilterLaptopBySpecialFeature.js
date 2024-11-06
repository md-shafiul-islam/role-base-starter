import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const specialFeatureData=[
    {title: "Backlit Keyboard", key: "backlit"},
    {title: "Touch Screen", key: "touch"},
    {title: "Finger Print", key: "finger"},
    {title: "Dual Display", key: "dualDisplay"},
    {title: "360 degree", key: "360"},
]

const FilterLaptopBySpecialFeature = () => {
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
        dataSource={specialFeatureData}
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

export default FilterLaptopBySpecialFeature;