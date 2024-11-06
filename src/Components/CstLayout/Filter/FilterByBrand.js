import React, { useEffect, useState } from "react";
import { List, Checkbox } from "antd";
import { SET_FILTER_BRANDS } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";

const FilterByBrand = ({
  brands = [],
  selectedBrands = [],
  onChaneBrandAction,
  ...params
}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => {
    return state.filter.brands;
  });

  useEffect(() => {
    setCheckedItems(reduxState);
  }, [reduxState]);

  const listChangeAction = (value) => {
    let items = [];
    if (checkedItems.includes(value)) {
      items = checkedItems.filter((item) => item !== value);
    } else {
      items = [value, ...checkedItems];
    }

    dispatch({
      type: SET_FILTER_BRANDS,
      payload: items,
    });

    setCheckedItems(items);
    onChaneBrandAction(items);
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
        dataSource={brands}
        renderItem={(item) => {
          return (
            <React.Fragment>
              <List.Item>
                <Checkbox
                  checked={isChecked(item?.name)}
                  onChange={() => {
                    listChangeAction(item?.name);
                  }}
                >
                  {item?.name}
                </Checkbox>
              </List.Item>
            </React.Fragment>
          );
        }}
      />
    </React.Fragment>
  );
};

export default FilterByBrand;
