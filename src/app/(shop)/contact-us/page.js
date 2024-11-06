import React from "react";
import Text from "antd/lib/typography/Text";
import { Col, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import CstActionLink from "../../component/EsAction/CstActionLink";

const contactUsPage = () => {
  return (
    <React.Fragment>
      <Row align="center" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Col span={14}>
          <Typography>
            <Title level={1} style={{ textAlign: "center" }}>
              Contact Us
            </Title>

            <Paragraph>We do appreciate your feedback.</Paragraph>
            <Paragraph>
              We will be glad to hear from you if:
              <br />- You have found a mistake in our phone reviews, price or
              specifications.
              <br />- You have information about a gadget/phone which we don't
              have in our database.
              <br />- You have found a broken/404 error link.
              <br />- You have a suggestion for improving GearOTG or you want to
              request a feature we do not have.
            </Paragraph>
            <Paragraph>
              Note: <br />
              -We do not sell any mobile phone or gadget.
            </Paragraph>
          </Typography>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default contactUsPage;
