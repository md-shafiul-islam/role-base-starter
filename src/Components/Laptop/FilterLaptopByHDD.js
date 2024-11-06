import { Checkbox, List } from "antd";
import React, { useState } from "react";

const LaptopHDDdate = [
  { title: "500 GB", key: "500gb" },
  { title: "1 TB", key: "1tb" },
  { title: "2TB", key: "2tb" },
  { title: "4 TB", key: "4tb" },
];

const FilterLaptopByHDD = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const listChangeAction = (value) => {
    const items = [];
    if (checkedItems.includes(value)) {
      items = checkedItems.filter((item) => item !== value);
    } else {
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
        dataSource={LaptopHDDdate}
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

export default FilterLaptopByHDD;
