import { Card, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import RecCstImage from "../CstView/RecCstImage";
import CstQueryActionLinkWrapper from "../EsAction/CstQueryActionLinkWrapper";

const RecommendCard = ({ item, actionUri, ...params }) => {
  return (
    <React.Fragment>
      <CstQueryActionLinkWrapper
        name={item?.title}
        pathName={`${actionUri}/[id]`}
        query={{ id: item?.aliasName }}
        title={item?.title}
      >
        <Card>
          <Row>
            <Col span={24} style={{ height: 150 }}>
              <RecCstImage
                src={item?.imageUrl}
                title={item?.title}
                altTag={item?.title}
                layout="responsive"
                className="recomendet-item"
              />
            </Col>
            <Col span={24}>
              <div className="recommended-product-details">
                <Text>{item?.title}</Text>
                <Text>Price: {item?.price}</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </CstQueryActionLinkWrapper>
    </React.Fragment>
  );
};

export default RecommendCard;
