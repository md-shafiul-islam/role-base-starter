import React from "react";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";


const SearchBox = (params) => {

    const onChange =(item)=>{
         esFrontLogger.info("Selecte Item, ",item);
    }

    const onSearch = (item)=>{
        esFrontLogger.info("On Search ", item);
    }

  return (
    <React.Fragment>
      <Select 
      
        style={{ width: '100%', tableLayout:"auto" }}
        showSearch={true}
        suffixIcon={<SearchOutlined />}
        showArrow={false}
        size={"large"}
        placeholder="Search"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        menuItemSelectedIcon= {<SearchOutlined />}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </React.Fragment>
  );
};

export default SearchBox;
