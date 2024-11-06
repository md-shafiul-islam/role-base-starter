import { Card, Checkbox, Col, Image, Pagination, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import "./Mobiles.module.css";
import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import OverlaySpiner from "../EsUtils/OverlaySpiner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import CstBtnActionLink from "../EsAction/CstBtnActionLink";
import CstImage from "../CstView/CstImage";
import {
  getClearCompareItemsAction,
  removeCompareItemAction,
  setCompareItemAction,
} from "../../redux/action/compareAction";
import { esBakToTop, esPagingNextPrev } from "../../utils/ui/esActions";

const AllMobiles = ({
  mobiles = [],
  rangeProductResp,
  count,
  itemType = "",
  isFilterActive,
  actionUri,
  compareItems,
  compareItemsKey,
  ...params
}) => {
  const [products, setProducts] = useState(mobiles);

  const [totalItemCount, setTotalItemCount] = useState(count);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(
    mobiles?.length > pageSize ? pageSize : mobiles?.length
  );
  const [pageSizeOptions, setPageSizeOptions] = useState([
    10, 20, 30, 40, 50, 75, 100,
  ]);

  useEffect(() => {
    if (!isEmptyOrNull(rangeProductResp)) {
      if (rangeProductResp.status) {
        if (Array.isArray(rangeProductResp.response)) {
          setProducts(rangeProductResp.response);
          setTotalItemCount(rangeProductResp.response.length);
        }
      }
    }
  }, [rangeProductResp]);

  useEffect(() => {
    if (!isFilterActive) {
      setProducts(mobiles);
    }
  }, [isFilterActive]);

  const isCompareChecked = (product) => {
    if (Array.isArray(compareItemsKey) && !isEmptyOrNull(product)) {
      if (compareItemsKey.includes(product.publicId)) {
        return true;
      }
    }
    return false;
  };

  const addOrRemoveCompareItem = (e, product) => {
    if (!isEmptyOrNull(product)) {
      if (e.target?.checked) {
        params.setCompareItemAction(product);
      } else {
        params.removeCompareItemAction(product?.publicId);
      }
    }
  };

  const loadMobiles = (start, size) => {
    setIsLoading(true);
    axios
      .get(`/api/mobiles?start=${start}&size=${size}&cat=${itemType}`)
      .then((resp) => {
        if (!isEmptyOrNull(resp.data.response?.products)) {
          setProducts(resp.data.response?.products);
        } else {
          setProducts(mobiles);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const pageChange = (cPage, pSize) => {
    let nPage = 0;
    if (pageSize !== pSize) {
      nPage = endCount / pSize;
      nPage = Math.floor(nPage);
    } else {
      nPage = cPage;
    }

    let pCpage = nPage - 1;
    pCpage = pCpage < 0 ? 0 : pCpage;

    const sCount = pCpage * pSize;
    let eCount = sCount + pSize;

    if (!isFilterActive) {
      if (nPage > 1) {
        loadMobiles((nPage - 1) * pSize, pSize);
      } else {
        loadMobiles(0, pSize);
      }
    } else {
      eCount = products.length > eCount ? eCount : products.length;
    }

    setPageSize(pSize);
    setCurrentPage(nPage);
    setStartCount(sCount);
    setEndCount(eCount);
    esBakToTop(window);
  };

  return (
    <React.Fragment>
      <OverlaySpiner status={isLoading} text="" />
      <Content className="product-container">
        <Row>
          {!isFilterActive ? (
            <React.Fragment>
              {products &&
                products.map((product, idx) => {
                  return (
                    <React.Fragment key={`product-${idx}`}>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        className="product"
                      >
                        <div className="site-card-border-less-wrapper-product">
                          <Card title={product?.title} bordered={false}>
                            <div className="product-image-next">
                              <CstImage
                                to={product?.imageUrl}
                                alt={product?.title}
                                title={product?.title}
                                className="product-list-image"
                              />
                            </div>
                            <div className="product-details-card">
                              <Text>Ram/Rom : {product?.ram}</Text>
                              <Text>
                                <h4>Price : {product?.price} Tk</h4>
                              </Text>
                              <Row gutter={[16, 16]}>
                                <Col span={24}>
                                  <Checkbox
                                    checked={isCompareChecked(product)}
                                    onChange={(e) => {
                                      addOrRemoveCompareItem(e, product);
                                    }}
                                  >
                                    Add to compare
                                  </Checkbox>
                                </Col>
                                <Col span={24}>
                                  <CstBtnActionLink
                                    name={product?.title}
                                    pathName={`${actionUri}/[id]`}
                                    query={{ id: product?.aliasName }}
                                    title={product?.title}
                                    isBlock={true}
                                    acClazzName="mptbo-5"
                                  />
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {products &&
                products.slice(startCount, endCount) &&
                products.slice(startCount, endCount).map((product, idx) => {
                  return (
                    <React.Fragment key={`product-${idx}`}>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        className="product"
                      >
                        <div className="site-card-border-less-wrapper-product">
                          <Card title={product?.title} bordered={false}>
                            <div className="product-image">
                              <CstImage
                                to={product?.imageUrl}
                                alt={product?.title}
                                title={product?.title}
                                className="product-list-image"
                              />
                            </div>
                            <div className="product-details-card">
                              <Text>Ram/Rom : {product?.ram}</Text>
                              <Text>
                                <h4>Price : {product?.price} Tk</h4>
                              </Text>
                              <Row gutter={[16, 16]}>
                                <Col span={24}>
                                  <Checkbox>Add to compare</Checkbox>
                                </Col>
                                <Col span={24}>
                                  <CstBtnActionLink
                                    name={product?.title}
                                    pathName={`${actionUri}/[id]`}
                                    query={{ id: product?.aliasName }}
                                    title={product?.title}
                                    isBlock={true}
                                    acClazzName="mptbo-5"
                                  />
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          )}
        </Row>
        <Row>
          {isFilterActive ? (
            <Col span={24} style={{ marginTop: 20 }}>
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                defaultPageSize={20}
                onChange={pageChange}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={true}
                pageSize={pageSize}
                total={totalItemCount}
                itemRender={esPagingNextPrev}
              />
            </Col>
          ) : (
            <Col span={24} style={{ marginTop: 20 }}>
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                defaultPageSize={pageSize}
                onChange={pageChange}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={true}
                pageSize={pageSize}
                total={totalItemCount}
                itemRender={esPagingNextPrev}
              />
            </Col>
          )}
        </Row>
      </Content>
    </React.Fragment>
  );
};

AllMobiles.propTypes = {
  rangeProductResp: PropTypes.object,
  isFilterActive: PropTypes.bool.isRequired,
  compareItems: PropTypes.array,
  compareItemsKey: PropTypes.array.isRequired,
  getClearCompareItemsAction: PropTypes.func.isRequired,
  setCompareItemAction: PropTypes.func.isRequired,
  removeCompareItemAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rangeProductResp: state.product.range,
  isFilterActive: state.filter.isFilterActive,
  compareItems: state.compare.items,
  compareItemsKey: state.compare.itemsKey,
});

const mapDispatchToProps = {
  getClearCompareItemsAction,
  setCompareItemAction,
  removeCompareItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMobiles);
