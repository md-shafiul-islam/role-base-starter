import React, { useState } from "react";
import { Card, Carousel, Col, Row } from "antd";
import CstImage from "../CstView/CstImage";
import { IMG_DIR, IMG_PHONE_DIR } from "../../utils/urlConst";
import CstQueryActionLinkWrapper from "../EsAction/CstQueryActionLinkWrapper";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";

const CstCarousel = ({ items = [], ...params }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Carousel autoplay={true} dotPosition="bottom">
            {items?.map((item) => {
              if (!isEmptyOrNull(item)) {
                return (
                  <div>
                    <CstQueryActionLinkWrapper
                      name={item.title}
                      title={item.title}
                      pathName={`/${item.category?.actionUrl}/[id]`}
                      query={{ id: item.aliasName }}
                    >
                      <Card className="carousel-card">
                        <CstImage
                          to={item.imageUrl}
                          alt={item.title}
                          title={item.title}
                        />
                      </Card>
                    </CstQueryActionLinkWrapper>
                  </div>
                );
              }
            })}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default CstCarousel;
