import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Card, Col, Row, Typography } from "antd";
import CstImage from "../../CstView/CstImage";
import CstBtnActionLink from "../../EsAction/CstBtnActionLink";
import { CloseSquareOutlined } from "@ant-design/icons";
import {
  getClearCompareItemsAction,
  removeCompareItemAction,
} from "../../../redux/action/compareAction";
import { connect } from "react-redux";

import { useRouter } from "next/router";

const { Text } = Typography;

const ComparePopoverCard = ({ compareItems = [], ...params }) => {
  let compareContainer = null;

  const router = useRouter();

  const pushComparePage = () => {
    let queryPath = "";

    compareItems.forEach((item, idx) => {
      if (idx === compareItems.length - 1) {
        queryPath += `${item.aliasName}`;
      } else {
        queryPath += `${item.aliasName} vs `;
      }
    });

    router.push({ pathname: `/compare`, query: { vs: queryPath } });
    params.closeAction(false);
  };
  return (
    <React.Fragment>
      <div className="popover-container">
        <div className="compare-items">
          <div className="compare-pop-over-buttons">
            <Row>
              <Col span={6}>
                <Button
                  onClick={params.getClearCompareItemsAction}
                  type="primary"
                >
                  Clear All
                </Button>
              </Col>
              <Col span={6} style={{ marginLeft: 15 }}>
                <Button
                  type="primary"
                  onClick={(e) => {
                    params.closeAction(false);
                  }}
                >
                  Close
                </Button>
              </Col>
              <Col span={10}>
                <Button type="primary" onClick={pushComparePage}>
                  Compare Now
                </Button>
              </Col>
            </Row>
          </div>

          <Row gutter={[10, 5]}>
            {compareItems?.map((product, idx) => {
              return (
                <Col span={24} key={`comp-product-${idx}`} className="product">
                  <React.Fragment>
                    <div className="site-card-border-less-wrapper-product">
                      <Card
                        title={product?.title}
                        bordered={false}
                        extra={
                          <CloseSquareOutlined
                            onClick={() => {
                              params.removeCompareItemAction(product.publicId);
                            }}
                          />
                        }
                      >
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
                              <CstBtnActionLink
                                name={`Go ${product?.title}`}
                                pathName={`${product?.category?.actionUrl}/[id]`}
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
                  </React.Fragment>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

ComparePopoverCard.propTypes = {
  compareItems: PropTypes.array,
  getClearCompareItemsAction: PropTypes.func.isRequired,
  removeCompareItemAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    compareItems: state.compare.items,
  };
};

const mapDispatchToProps = {
  getClearCompareItemsAction,
  removeCompareItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComparePopoverCard);
