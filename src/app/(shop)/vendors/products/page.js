import { HomeOutlined, MobileOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Drawer, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Head from "next/head";
import React, { useState } from "react";
import FilterLayoutPhones from "../../../component/CstLayout/Filter/FilterLayoutPhones";
import CstActionLink from "../../../component/EsAction/CstActionLink";
import PriceRangeNavBar from "../../../component/Search/PriceRangeNavBar";
import BackToTop from "../../../component/CstLayout/BackToTop";
import axios from "axios";
import { isEmptyOrNull } from "../../../utils/gen-es/esCheckFunc";
import AllBrandMobiles from "../../../component/Mobiles/AllBrandMobiles";
import { getGenaretedRangeItems } from "../../../utils/gen-es/genaretor";

const brandProductsPage = ({ mobiles, brandName, rangeItems, ...params }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>GearOTG | {brandName} </title>

        <meta
          name="description"
          content={`See mobile price in Bangladesh, specicifications of ${brandName}, See All ${brandName} Smart Phone price in Bangladesh, specicifications,  See All ${brandName} mobile price in Bangladesh, specicifications, See All ${brandName} Tablet price in Bangladesh, specicifications, See All ${brandName} Smart Watches price in Bangladesh, specicifications`}
        />
        <meta
          name="keywords"
          content={`See mobile price in Bangladesh, specs of ${brandName}, See mobile price in Bangladesh, specicifications of ${brandName}, See All ${brandName} Smart Phone price in Bangladesh, specicifications,  See All ${brandName} mobile price in Bangladesh, specicifications, See All ${brandName} Tablet price in Bangladesh, specicifications, See All ${brandName} Smart Watches price in Bangladesh, specicifications`}
        />
        <meta
          property="og:title"
          content={`All ${brandName} Mobiles/Smart Watches/Tablets`}
        />
      </Head>
      <Row>
        <Col span={23} offset={1} className="mobile-menu-type">
          <Breadcrumb>
            <Breadcrumb.Item>
              <CstActionLink to="/" icon={<HomeOutlined />} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <MobileOutlined />
              <span>Smart Phone</span>
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
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 3 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              xxl={{ span: 5 }}
            >
              <div className="mobileHidden mgt-10">
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
              <AllBrandMobiles mobiles={mobiles} count={mobiles?.lenght} />
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

  let mobiles = [];

  const rangeItems = getGenaretedRangeItems(0, 350000);
  try {
    const resp = await axios.get(
      `${actionUrl}/brands/products/?brand=${context.params.name}&cat=SmartPhone`
    );

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        mobiles = resp.data.response;
      }
    }
  } catch (error) {
    esBackLogger.info("Brand Mobile Phones, Geting Server side data Error ", error);
  }

  return {
    props: { mobiles, brandName: context.params.name, rangeItems }, // will be passed to the page component as props
  };
}

export default brandProductsPage;
