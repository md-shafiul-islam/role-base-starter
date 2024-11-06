"use client";
import React from "react";
import { Card, Checkbox, Col, Row } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import "./Product.module.css";
import CstImage from "../CstView/CstImage";
import CstBtnActionLink from "../EsAction/CstBtnActionLink";
import CstQueryActionLinkWrapper from "../EsAction/CstQueryActionLinkWrapper";
import {
  getClearCompareItemsAction,
  removeCompareItemAction,
  setCompareItemAction,
} from "../../redux/action/compareAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";

const Product = ({ product, compareItemsKey, ...params }) => {
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

  return (
    <>
      {product && (
        <div className="site-card-border-less-wrapper-product">
          <Card title={product?.title} bordered={false}>
            <Col span={24} className="product-image">
              {product.imageUrl && (
                <CstQueryActionLinkWrapper
                  pathName={`${product?.category?.actionUrl}/[id]`}
                  query={{ id: product?.aliasName }}
                  title={product?.title}
                >
                  <CstImage
                    to={product.imageUrl}
                    alt={product.title}
                    title={product.title}
                    className="pci-size"
                  />
                </CstQueryActionLinkWrapper>
              )}
            </Col>

            <Col span={24}>
              <Text>Ram/Rom : {product.ram}</Text>
              <Text>
                <h4>Price : {product.price} Tk</h4>
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
                    pathName={`${product?.category?.actionUrl}/[id]`}
                    query={{ id: product?.aliasName }}
                    title={product?.title}
                    isBlock={true}
                    acClazzName="mptbo-5"
                    icon={<AlignLeftOutlined />}
                  />
                </Col>
              </Row>
            </Col>
          </Card>
        </div>
      )}
    </>
  );
};

Product.propTypes = {
  rangeProductResp: PropTypes.object,
  isFilterActive: PropTypes.bool.isRequired,
  compareItems: PropTypes.array,
  compareItemsKey: PropTypes.array.isRequired,
  getClearCompareItemsAction: PropTypes.func.isRequired,
  setCompareItemAction: PropTypes.func.isRequired,
  removeCompareItemAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFilterActive: state.filter.isFilterActive,
  compareItems: state.compare.items,
  compareItemsKey: state.compare.itemsKey,
});

const mapDispatchToProps = {
  getClearCompareItemsAction,
  setCompareItemAction,
  removeCompareItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
