/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axios from "axios";

import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import FilterLayoutPhones from "../../component/CstLayout/Filter/FilterLayoutPhones";
import BackToTop from "../../component/CstLayout/BackToTop";
import Head from "next/head";
import { Drawer, Button } from "antd";
import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import CstActionLink from "../../component/EsAction/CstActionLink";
import { HomeOutlined, MobileOutlined } from "@ant-design/icons/lib/icons";
import Title from "antd/lib/typography/Title";
import CstImage from "../../component/CstView/CstImage";
import Paragraph from "antd/lib/skeleton/Paragraph";
import CstBtnActionLink from "../../component/EsAction/CstBtnActionLink";

const brandPagePage = ({ brand, count, ...params }) => {
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
          <title>GearOTG | {brand?.name}</title>

          <meta
            name="description"
            content={`GearOTG Or Gear ON THE GO. ${brand?.name} Details Page`}
          />
          <meta
            property="og:title"
            content={`GearOTG Or Gear ON THE GO. ${brand?.name} Details Page`}
          />
          <meta property="keywords" content={`${brand?.name} Details Page`} />
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
              <span>Smart Phone</span>
            </Breadcrumb.Item>
          </Breadcrumb>
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
              <div className="mobileHidden">
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
              <Card title={brand?.name} extra={brand?.tagLine}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <CstImage to={brand?.logoUrl} width={200} height={300} />
                  </Col>
                  <Col span={24}>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{ __html: brand?.description }}
                      ></div>
                    </Typography>
                    <Paragraph>
                      {brand?.website && (
                        <a target="_blank" href={brand?.website}></a>
                      )}
                    </Paragraph>
                  </Col>
                  <Col span={24}>
                    <CstBtnActionLink
                      name={`Find By All ${brand?.name} Items`}
                      pathName={`/brands/products/[name]`}
                      query={{ name: brand?.name }}
                      title={brand?.name}
                      type="success"
                    />
                  </Col>
                </Row>
              </Card>
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

  const { params } = context;

  let brand = null;
  try {
    const resp = await axios.get(`${actionUrl}/brands/name/${params.id}`, {
      headers: REQUEST_HEADER,
    });

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        brand = resp.data.response;
      }
    }
  } catch (error) {
    esBackLogger.info("Get Brand Details, Geting Server side data Error ", error);
  }

  return {
    props: { brand }, // will be passed to the page component as props
  };
}

export default brandPagePage;
