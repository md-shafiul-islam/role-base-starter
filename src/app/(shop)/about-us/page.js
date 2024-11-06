import React from "react";
import { Col, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import CstActionLink from "../../component/EsAction/CstActionLink";

const aboutUsPage = () => {
  return (
    <React.Fragment>
      <Row align="center" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Col span={14}>
          <Typography>
            <Title level={1} style={{ textAlign: "center" }}>
              About Us
            </Title>
            <Paragraph>
              <CstActionLink
                name={`Gear on the GO`}
                title="Gear on the GO"
                to="/"
              />{" "}
              <CstActionLink to="/" name="(GearOTG)" title="( GearOTG )" /> is a
              gadget specifications, reviews, comparison based website and
              initially aims to provide phone prices in Bangladesh. We collect
              data from official sources and try to simplify it for our visitors
              to understand better. We have gathered a collection of mobile
              specifications, images of almost all the phones since 1996.
            </Paragraph>
          </Typography>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default aboutUsPage;
