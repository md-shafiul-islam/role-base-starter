import React, { useEffect, useMemo, useState } from "react";
import { AutoComplete, Col, Row } from "antd";
import { escapeRegExp } from "lodash";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { initSearchItemsAction } from "../../redux/action/searchAction";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const MAX_DISPLAYED_OPTIONS = 500;

const { Option } = AutoComplete;

const CstAntAutoComplete = ({
  searchOptionsResp,
  searchType = "Default",
  onSelectAction,
  onChangeAction,
  keySearchAction,
  options = [],
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [changeValue, setChangeValue] = useState({ text: "", item: null });
  const [searchOptions, setSearchOptions] = useState(options);

  useEffect(() => {
    if (isEmptyOrNull(searchOptionsResp)) {
      props.initSearchItemsAction();
    } else {
      setSearchOptions(searchOptionsResp.response);
    }
  }, [searchOptionsResp]);

  const getSearchString = (option) => {
    if (!isEmptyOrNull(option)) {
      return option.name;
    }
    return "";
  };

  const filteredOptions = useMemo(() => {
    if (isEmptyOrNull(inputValue)) {
      return [];
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

    for (const option of searchOptions) {
      if (regByInclusion.test(option.title)) {
        if (regByStart.test(option.title)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValue, searchOptions]);

  const handleSearch = (searchText) => {
    setInputValue(searchText);
  };

  const slicedOptions = useMemo(() => {
    if (Array.isArray(filteredOptions)) {
      if (filteredOptions.length > 0) {
        return filteredOptions?.slice(0, MAX_DISPLAYED_OPTIONS);
      }
    }
    return [];
  }, [filteredOptions]);

  const onClicAction = (e) => {
    esFrontLogger.info("Search Click Action ", e);
  };

  const onKeyAction = async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      keySearchAction(changeValue);
    } else {
      onChangeAction(changeValue);
    }
  };

  const onChangeHandler = (text, item) => {
    setChangeValue({ text, item });
  };

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <AutoComplete
            style={{
              width: `100%`,
            }}
            size="large"
            onSearch={handleSearch}
            onChange={onChangeHandler}
            placeholder="Search..."
            backfill={true}
            onClick={onClicAction}
            onSelect={onSelectAction}
            onKeyUp={onKeyAction}
          >
            {slicedOptions?.map((item) => {
              return (
                <Option key={item.aliasName} value={item.aliasName}>
                  {item.name}
                </Option>
              );
            })}
          </AutoComplete>
        </Col>
      </Row>
    </React.Fragment>
  );
};

CstAntAutoComplete.propTypes = {
  initSearchItemsAction: PropTypes.func.isRequired,
  searchOptionsResp: PropTypes.object,
};

const mapStateToProps = (state) => ({
  searchOptionsResp: state.product.searchOptions,
});

const mapDispatchToProps = { initSearchItemsAction };

export default connect(mapStateToProps, mapDispatchToProps)(CstAntAutoComplete);
