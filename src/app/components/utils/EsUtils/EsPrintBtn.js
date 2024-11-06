import { Affix, Col, Divider, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import EsButton from "./EsButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const EsPrintBtn = ({ printAction, printBtnTitle, ...params }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={4} offset={20}>
          <Affix style={{ position: "absolute", bottom: 25, left: 85 }}>
            <EsButton
              icon={<FontAwesomeIcon size="lg" icon={faPrint} />}
              type="cool"
              onClick={printAction}
              title={printBtnTitle}
              size="large"
              shape="circle"
            >
              Print
            </EsButton>
          </Affix>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EsPrintBtn;
