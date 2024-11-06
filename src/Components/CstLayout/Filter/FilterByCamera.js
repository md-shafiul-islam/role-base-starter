import React, { useState } from 'react'
import { Checkbox, List} from 'antd';

const camData = [

    {title: "1 MP", key:"1"},
    {title: "2 MP", key:"2"},
    {title: "5 MP", key:"5"},
    {title: "8 MP", key:"8"},
    {title: "12 MP", key:"12"},
    {title: "16 MP", key:"16"},
    {title: "18 MP", key:"18"},
    {title: "25 MP", key:"25"},
    {title: "32 MP", key:"32"},
    {title: "48 MP", key:"48"},
    {title: "64 MP", key:"64"},
    {title: "Above 64 MP", key:"Above 64"},
]

const FilterByCamera = (params) => {
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
    <>
        <List 
        dataSource={camData}
        renderItem={(item) =>{
            return(
                <>
                    <List.Item>
                        <Checkbox
                        checked={isChecked(item?.key)}
                        onChange={()=>{
                            listChangeAction(item?.key)
                        }}

                        >
                            {item?.title}
                        </Checkbox>
                    </List.Item>
                </>
            )
        }
        }
        ></List>
    </>
  )
};

export default FilterByCamera;