import { Card, Col, Row } from "antd";
import React from "react";

import VerticalCategory from "@/src/app/components/shop/VerticalCategory";
import ProductItem from "@/src/app/components/shop/ProductItem";

import CstActionLink from "@/src/app/components/utils/Action/CstActionLink";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import PageWrapper from "@/src/app/components/utils/PageWrapper";
import CstCarousel from "@/src/app/components/shop/Carousel";
import RegisterCard from "@/src/Components/User/RegisterCard";

const registerIndexPage = async () => {
  return (
    <React.Fragment>
      <PageWrapper>
        <Row>
          <Col span={24}>
            <Row gutter={[0, 24]}>
              <Col
                sm={24}
                md={24}
                span={24}
                className="box-border px-9 mt-9 xs:px-1 xxs:p-0 md:px-5 lg:px-9"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={6} lg={5} xl={5}>
                    <VerticalCategory categories={[]} />
                  </Col>
                </Row>
              </Col>

              <Col
                span={24}
                className="box-border px-9 mt-2 xs:px-1 xxs:p-0 md:px-5 lg:px-9"
              >
                <div className="grid grid-cols-1 items-center justify-center">
                  <RegisterCard />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageWrapper>
    </React.Fragment>
  );
};

export default registerIndexPage;
