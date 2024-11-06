/* eslint-disable react-hooks/rules-of-hooks */
// @src/hooks/useVideoPlayer.js
import React, { useState } from "react";
import axios from "axios";
import { Card, Col, Pagination, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Home from "../../component/Home/Home";
import HomeTopRightContent from "../../component/Home/HomeTopRightContent";
import Products from "../../component/Home/Products";
import BackToTop from "../../component/CstLayout/BackToTop";

import ShortVideo from "../../component/CstLayout/videoPlayer/ShortVideo";
import { newsData, productsData, brandData } from "../../utils/helperData";
import NewsCards from "../../component/NewsCard/NewsCards";
import Brands from "../../component/Home/Brands";
import Head from "next/head";
import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import Product from "../../component/Home/Product";
import { Content } from "antd/lib/layout/layout";
import { esFrontLogger } from "../../utils/es-loger/esFrontLogger";

const searchPage = ({ products = [], ...params }) => {
  const newsItems = newsData;
  const brandItems = brandData;

  const [totalItemCount, setTotalItemCount] = useState(products?.length);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(pageSize);
  const [pageSizeOptions, setPageSizeOptions] = useState([
    10, 20, 30, 40, 50, 75, 100,
  ]);

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

    setPageSize(pSize);
    setCurrentPage(nPage);
    setStartCount(sCount);
    setEndCount(eCount);
  };

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>Tech Geek | Search</title>
      </Head>

      <Row align="center">
        <Col span={23}>
          <Row align="center" gutter={[16, 2]}>
            <Col span={24} className="text-alc">
              <Title level={2}>Find and match your expectations!</Title>
              <Content className="product-container">
                <Row>
                  {products &&
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
                            <Product product={product} />
                          </Col>
                        </React.Fragment>
                      );
                    })}
                </Row>
              </Content>
            </Col>
            <Col span={24}>
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                defaultPageSize={pageSize}
                onChange={pageChange}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={true}
                pageSize={pageSize}
                total={totalItemCount}
              />
            </Col>
          </Row>

          {/* <Row className="news-article">
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 14 }}
              lg={{ span: 17 }}
              xl={{ span: 13 }}
              xxl={{ span: 13 }}
            >
              <h1>News and Reviews</h1>
              <NewsCards newsItems={newsItems} />
            </Col>
          </Row> */}
        </Col>
      </Row>

      <BackToTop />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const actionUrl = `${process.env.EXT_BACK_END_URL}/api`;

  esFrontLogger.info("Search Query ", context.query.name);

  let products = [];
  try {
    const resp = await axios.get(
      `${actionUrl}/products/qr/search/${encodeURIComponent(
        context.query.name
      )}`,
      {
        headers: REQUEST_HEADER,
      }
    );

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        products = resp.data.response;
      }
    }
  } catch (error) {
    esBackLogger.info("Search Query Page, Geting Server side data Error ", error);
  }

  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default searchPage;
