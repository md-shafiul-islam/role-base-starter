import { Col, Row, Space } from "antd";
import React from "react";
import { getCurrenyFormatSongkhaNoDec } from "../../utils/gen-es/converter";

const PrintableSummary = ({ items = [], ...params }) => {
  return (
    <Row style={{ background: "#8cc8ff" }}>
      <Col span={24} className="crcd-btm-area">
        <Row>
          {items.map((item) => {
            return (
              <Col span={item?.colSpan}>
                <Space size={[8, 8]}>
                  <span className="cr-dr-bt-text">{item?.name}</span>
                  <span className="cr-dr-bt-text">{item?.value}</span>
                </Space>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default PrintableSummary;
