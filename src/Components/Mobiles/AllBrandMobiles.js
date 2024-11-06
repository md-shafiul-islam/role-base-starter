import { Card, Col, Image, Checkbox, Pagination, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import "./Mobiles.module.css";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import CstBtnActionLink from "../EsAction/CstBtnActionLink";
import {
  getClearCompareItemsAction,
  removeCompareItemAction,
  setCompareItemAction,
} from "../../redux/action/compareAction";
import { esBakToTop, esPagingNextPrev } from "../../utils/ui/esActions";

const AllBrandMobiles = ({
  mobiles = [],
  compareItemsKey,
  rangeProductResp,
  isFilterActive,
  ...params
}) => {
  const [products, setProducts] = useState(mobiles);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(mobiles?.length);
  const [pageSize, setPageSize] = useState(10);
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(pageSize);
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
    setProducts(mobiles);
  }, [mobiles]);

  useEffect(() => {
    if (!isFilterActive) {
      setProducts(mobiles);
    }
  }, [isFilterActive]);
  
  const isCompareChecked = (item) => {
    if (Array.isArray(compareItemsKey) && !isEmptyOrNull(item)) {
      if (compareItemsKey.includes(item.publicId)) {
        return true;
      }
    }
    return false;
  };

  const addOrRemoveCompareItem = (e, item) => {
    if (!isEmptyOrNull(item)) {
      if (e.target?.checked) {
        params.setCompareItemAction(item);
      } else {
        params.removeCompareItemAction(item?.publicId);
      }
    }
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

    eCount = products.length > eCount ? eCount : products.length;

    setPageSize(pSize);
    setCurrentPage(nPage);
    setStartCount(sCount);
    setEndCount(eCount);

    esBakToTop(window);
  };

  return (
    <React.Fragment>
      <Content className="product-container">
        <Row>
          <React.Fragment>
            {products &&
              products.slice(startCount, endCount)?.map((product, idx) => {
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
                          <div
                            className="product-image"
                            style={{ height: 300 }}
                          >
                            <Image
                              src={product?.imageUrl}
                              alt={product?.title}
                              title={product?.title}
                              height={210}
                              width=""
                              layout="responsive"
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
                                  pathName={`/${product.category?.actionUrl}/[id]`}
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
        </Row>
        <Row>
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
        </Row>
      </Content>
    </React.Fragment>
  );
};

AllBrandMobiles.propTypes = {
  rangeProductResp: PropTypes.object,
  isFilterActive: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(AllBrandMobiles);
