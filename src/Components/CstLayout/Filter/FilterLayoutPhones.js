import { Card, Col, Collapse, Input, Row, Slider, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  getAllProductByPriceRange,
  getAllProductByPriceRangeWithBrands,
} from "../../../redux/action/productAction";
import { isEmptyOrNull } from "../../../utils/gen-es/esCheckFunc";
import FilterByBrand from "./FilterByBrand";
import FilterByCamera from "./FilterByCamera";
import FilterByRam from "./FilterByRam";
import FilterByStorage from "./FilterByStorage";

import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  SET_FILTER_BRANDS,
  SET_FILTER_RANGE_VALUE,
  SET_IS_FILTER_ACTIVE,
} from "../../../redux/types";
import { getAllBrand } from "../../../redux/action/brandAction";
import OverlaySpiner from "../../EsUtils/OverlaySpiner";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const { Panel } = Collapse;

const FilterLayoutPhones = ({
  filterType,
  filterRane,
  isFilterActive,
  filterBrands,
  brandResp,
  filterProductResp,
  ...params
}) => {
  const [minNum, setMinNum] = useState(filterRane[0]);
  const [maxNum, setMaxNum] = useState(filterRane[1]);
  const [sliderValues, setSliderValues] = useState(filterRane);
  const [brands, setBrands] = useState([]);
  const [currentBrands, setCurrentBrands] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onChange = (value) => {
    if (Array.isArray(value)) {
      setSliderValues(value);
      setMaxNum(value[1]);
      setMinNum(value[0]);
    }
  };

  const brandCollapseOnChange = (value) => {
    esFrontLogger.info("Colpas Change ", value);
  };

  const minChangeValue = (e) => {
    if (e?.target?.value) {
      setSliderValues([Number(e.target.value), sliderValues[1]]);
      setMinNum(Number(e.target.value));
    }
  };

  const maxChangeValue = (e) => {
    if (e?.target?.value) {
      setSliderValues([sliderValues[0], Number(e.target.value)]);
      setMaxNum(e.target.value);
    }
  };

  const priceRangeSearchAction = (range) => {
    params.getAllProductByPriceRangeWithBrands({
      brands: currentBrands,
      range: { start: minNum, end: maxNum },
      type: filterType,
    });
    getFilterLoadingAction();
    dispatch({
      type: SET_IS_FILTER_ACTIVE,
      payload: true,
    });
    dispatch({
      type: SET_FILTER_RANGE_VALUE,
      payload: range,
    });
  };

  const onChangeBrandAction = (sBrands) => {
    params.getAllProductByPriceRangeWithBrands({
      brands: sBrands,
      range: { start: minNum, end: maxNum },
      type: filterType,
    });
    dispatch({
      type: SET_IS_FILTER_ACTIVE,
      payload: true,
    });
    setCurrentBrands(sBrands);
    getFilterLoadingAction();
  };

  const getFilterLoadingAction = () => {
    setIsLoading(true);
  };

  const restFilterAction = () => {
    dispatch({
      type: SET_IS_FILTER_ACTIVE,
      payload: false,
    });
    dispatch({
      type: SET_FILTER_RANGE_VALUE,
      payload: [0, 320000],
    });
    dispatch({
      type: SET_FILTER_BRANDS,
      payload: [],
    });
  };

  useEffect(() => {
    if (!isFilterActive) {
      setSliderValues([0, 320000]);
      setMinNum(0);
      setMaxNum(320000);
    }
  }, [isFilterActive]);

  useEffect(() => {
    if (!isEmptyOrNull(filterProductResp) && isLoading) {
      if (filterProductResp.status || filterProductResp.errStatus) {
        setIsLoading(false);
      }
    }
  }, [filterProductResp]);

  useEffect(() => {
    if (!isEmptyOrNull(brandResp)) {
      if (!isEmptyOrNull(brandResp.response)) {
        setBrands(brandResp.response);
      } else {
        params.getAllBrand();
      }
    } else {
      params.getAllBrand();
    }
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(brandResp)) {
      if (!isEmptyOrNull(brandResp.response)) {
        setBrands(brandResp.response);
      }
    }
  }, [brandResp]);

  return (
    <>
      <Row>
        <OverlaySpiner status={isLoading} />
        <Col span={24}>
          <Card>
            <div className="filter-title-area">
              <span className="filter-title">Filter</span>
              <span className="rest-action" onClick={restFilterAction}>
                Rest filter
              </span>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="Price Range">
            <Row>
              <Col span={24}>
                <Slider
                  range={true}
                  defaultValue={[0, 320000]}
                  min={0}
                  max={320000}
                  onAfterChange={priceRangeSearchAction}
                  onChange={onChange}
                  value={sliderValues}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={10}>
                    <Input
                      type="number"
                      placeholder="Min"
                      max={320000}
                      min={0}
                      onChange={minChangeValue}
                      value={minNum}
                      onPressEnter={() => {
                        priceRangeSearchAction(sliderValues);
                      }}
                      onBlur={() => {
                        priceRangeSearchAction(sliderValues);
                      }}
                    />
                  </Col>
                  <Col span={10} offset={4}>
                    <Input
                      type="number"
                      placeholder="Max"
                      max={320000}
                      min={0}
                      onChange={maxChangeValue}
                      value={maxNum}
                      onPressEnter={() => {
                        priceRangeSearchAction(sliderValues);
                      }}
                      onBlur={() => {
                        priceRangeSearchAction(sliderValues);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Card>
            <Collapse defaultActiveKey={[""]} onChange={brandCollapseOnChange}>
              <Panel header="Brands" key="1">
                <FilterByBrand
                  brands={brands}
                  onChaneBrandAction={onChangeBrandAction}
                  selectedBrands={filterBrands}
                />
              </Panel>
            </Collapse>
          </Card>
          {/* <Card>
            <Collapse defaultActiveKey={[""]}>
              <Panel header="Storage" key="storage">
                <FilterByStorage />
              </Panel>
            </Collapse>
          </Card> */}
        </Col>

        {/* <Col span={24}>
          <Card>
            <Collapse defaultActiveKey={[""]}>
              <Panel header="Ram" key="ram">
                <FilterByRam />
              </Panel>
            </Collapse>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Collapse defaultActiveKey={[" "]}>
              <Panel header="Camera">
                <FilterByCamera />
              </Panel>
            </Collapse>
          </Card>
        </Col> */}
      </Row>

      {/* <Row>
            <Card title="Brands">
                
            </Card>
        </Row> */}
    </>
  );
};

FilterLayoutPhones.propTypes = {
  getAllProductByPriceRange: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
  filterRane: PropTypes.array.isRequired,
  isFilterActive: PropTypes.bool.isRequired,
  brandResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    filterRane: state.filter.filterRange,
    isFilterActive: state.filter.isFilterActive,
    filterBrands: state.filter.brands,
    brandResp: state.brand.brands,
    filterProductResp: state.product.range,
  };
};

const mapDispatchToProps = {
  getAllProductByPriceRange,
  getAllProductByPriceRangeWithBrands,
  getAllBrand,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLayoutPhones);
