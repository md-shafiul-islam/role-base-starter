import React from "react";
import { Select } from "antd";

const EsSearchBox = ({ options, onChange, ...params }) => {
  return (
    <React.Fragment>
      <Select
        allowClear={true}
        onChange={onChange}
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((item, idx) => {
          return (
            <Option key={`search-${idx}`} value={item.value}>
              {item.title}
            </Option>
          );
        })}
      </Select>
    </React.Fragment>
  );
};

export default EsSearchBox;
