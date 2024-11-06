import { Col, Row } from "antd";
import React from "react";

import VerticalCategory from "../components/shop/VerticalCategory";
import ProductItem from "../components/shop/ProductItem";
import axios from "axios";
import CstActionLink from "../components/utils/Action/CstActionLink";
import { isEmptyOrNull } from "../components/utils/Action/esFunc/gen-es/esCheckFunc";
import PageWrapper from "@/src/app/components/utils/PageWrapper";
import CstCarousel from "../components/shop/Carousel";

const getRandomProducts = async (size) => {
  "use server";

  try {
    const productResp = await axios.get(
      `${process.env.API_BASE_LINK}/products?type=rnd&size=${size}`
    );

    return productResp.data.response;
  } catch (error) {
    return [];
  }
};

const getAllCategory = async () => {
  "use server";

  try {
    const categoryResp = await axios.get(
      `${process.env.API_BASE_LINK}/categories`
    );
    return categoryResp.data.response;
  } catch (error) {
    return [];
  }
};

const shopIndexPage = async () => {
  const featureProducts = await getRandomProducts(12);
  const mostWanted = await getRandomProducts(12);

  const categoryResp = await getAllCategory();

  const categories = [
    {
      label: (
        <CstActionLink
          name={"All Products"}
          pathName={`/all-product`}
          title={`All Category`}
        />
      ),

      key: `all-category-products-s`,
    },
  ];

  if (!isEmptyOrNull(categoryResp)) {
    categoryResp &&
      categoryResp.forEach((category, idx) => {
        categories.push({
          label: (
            <CstActionLink
              name={category?.name}
              pathName={`/products`}
              query={{ category: category?.value }}
              title={category?.name}
            />
          ),

          key: `cat-${category?.value}-${idx}`,
        });
      });
  }

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
                    <VerticalCategory categories={categories} />
                  </Col>
                  <Col xs={24} md={18} lg={19} xl={19}>
                    <CstCarousel />
                  </Col>
                </Row>
              </Col>

              <Col
                span={24}
                className="box-border px-9 mt-2 xs:px-1 xxs:p-0 md:px-5 lg:px-9"
              >
                <h2 className="text-xl my-6 border-b border-dashed py-5 font-semibold">
                  Feature Products
                </h2>
                <Row gutter={[16, 16]} align="stretch">
                  {featureProducts &&
                    featureProducts.map((product) => {
                      return (
                        <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                          <ProductItem item={product} />
                        </Col>
                      );
                    })}
                </Row>
              </Col>
            </Row>

            <Row>
              <Col
                span={24}
                className="box-border px-9 mt-9 xs:px-1 xxs:p-0 md:px-5 lg:px-9"
              >
                <h2 className="text-lg my-6 border-b border-dashed py-5 font-semibold">
                  Most Wanted
                </h2>
                <Row gutter={[16, 16]}>
                  {mostWanted &&
                    mostWanted.map((item) => {
                      return (
                        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                          <ProductItem item={item} />
                        </Col>
                      );
                    })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageWrapper>
    </React.Fragment>
  );
};

export default shopIndexPage;
