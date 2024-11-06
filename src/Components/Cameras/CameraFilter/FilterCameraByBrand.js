import { Checkbox, List } from 'antd';
import React from 'react'
import { useState } from 'react/cjs/react.development';


const filterByBrand = [
    { title: "Canon", key: "Canon" },
    { title: "Nikon", key: "nikon" },
    { title: "Panasonic", key: "panasonic" },
    { title: "Sony", key: "sony" },
    { title: "GoPro", key: "gopro" },
    { title: "Kodak", key: "kodak" },
    { title: "POlaroid", key: "polaroid" },
    { title: "Samsung", key: "SamsungCam" },
    { title: "Olympus", key: "olympus" },
    { title: "Epson", key: "epson" },
    { title: "Fujifilm", key: "fujifilm" },
    { title: "DJI", key: "dji" },
    { title: "Thomson", key: "homson" },
    { title: "Pentax", key: "pentax" },
    { title: "Hasselblad", key: "hasselblad" },
    { title: "Sigma", key: "sigma" },
    { title: "Bell & Howell", key: "bell&howell" },
    { title: "BenQ", key: "benqcam" },

]



const FilterCameraByBrand = () => {
    const [checkedItems, setCheckedItems] = useState([]);

  const listChangeAction = (value) => {

    const items = [];
    if(checkedItems.includes(value)){
        items = checkedItems.filter((item) => item !== value);
    }else{
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
        <List
        dataSource={filterByBrand}
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

export default FilterCameraByBrand;