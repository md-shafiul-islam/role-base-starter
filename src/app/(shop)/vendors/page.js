/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axios from "axios";

import { Breadcrumb, Col, Row } from "antd";
import FilterLayoutPhones from "../../component/CstLayout/Filter/FilterLayoutPhones";

import BackToTop from "../../component/CstLayout/BackToTop";
import Head from "next/head";
import { Drawer, Button } from "antd";
import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import CstActionLink from "../../component/EsAction/CstActionLink";
import { HomeOutlined, MobileOutlined } from "@ant-design/icons/lib/icons";
import PriceRangeNavBar from "../../component/Search/PriceRangeNavBar";
import Title from "antd/lib/typography/Title";
import BrandList from "../../component/Brands/BrandList";
import { getGenaretedRangeItems } from "../../utils/gen-es/genaretor";

const brandIndexPage = ({ brands, metaStr, rangeItems, ...params }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>GearOTG | Brand List</title>

          <meta name="description" content={metaStr} />
          <meta name="keywords" content={metaStr} />
          <meta property="og:title" content="All Brands" />
        </Head>
      </div>
      <Row>
        <Col span={23} offset={1} className="mobile-menu-type">
          <Breadcrumb>
            <Breadcrumb.Item>
              <CstActionLink to="/" icon={<HomeOutlined />} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <MobileOutlined />
              <span>Brands</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row align="center">
        <Col span={23}>
          <Title level={4}>Find By Price Range:</Title>
          <PriceRangeNavBar actionUrl="/mobiles" rangeItems={rangeItems} />
        </Col>
      </Row>
      <Row className="mobile-menu-type2" align="center">
        <Col span={23}>
          <Row gutter={[16,16]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 3 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              xxl={{ span: 5 }}
            >
              <div className="mobileHidden ">
                <FilterLayoutPhones filterType="SmartPhone" />
              </div>
              <div className="mobileVisible">
                <Button type="primary" onClick={showDrawer}>
                  Filter
                </Button>
                <Drawer
                  width={250}
                  title="Filter"
                  placement="left"
                  onClose={onClose}
                  open={visible}
                >
                  <FilterLayoutPhones />
                </Drawer>
              </div>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 21 }}
              lg={{ span: 19 }}
              xl={{ span: 19 }}
              xxl={{ span: 19 }}
            >
             
                  <BrandList
                  brands={brands}
                  actionUrl="/brands"
                  productUrl="/brands/products"
                />
              
            </Col>
          </Row>
        </Col>
      </Row>
      <BackToTop />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const actionUrl = `${process.env.EXT_BACK_END_URL}/api`;

  const rangeItems = getGenaretedRangeItems(0, 350000);
  let brands = [];
  let metaStr = "";
  try {
    const resp = await axios.get(`${actionUrl}/brands`, {
      headers: REQUEST_HEADER,
    });

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        brands = resp.data.response;
      }
    }

    brands.forEach((item) => {
      metaStr += `See mobile price in Bangladesh, specicifications of ${item.name}`;
    });
  } catch (error) {
    esBackLogger.info("Mobile Phones, Geting Server side data Error ", error);
  }

  return {
    props: { brands, metaStr, rangeItems }, // will be passed to the page component as props
  };
}

export default brandIndexPage;
