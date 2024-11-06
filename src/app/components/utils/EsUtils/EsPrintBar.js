import { Col, Row, Space } from "antd";
import React, { useState } from "react";
import EsButton from "./EsButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faPager,
  faPaintBrush,
  faPaintbrush,
  faPrint,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const EsPrintBar = ({ onPrint, onPrintEnable, onReload, ...params }) => {
  const [btnStatus, setBtnStatus] = useState(false);
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Space size={[8, 8]} align="end">
            <EsButton
              onClick={() => {
                onReload();
              }}
              icon={<FontAwesomeIcon icon={faRefresh} />}
              type="worr"
            />
            {btnStatus ? (
              <EsButton
                onClick={() => {
                  onPrintEnable(!btnStatus);
                  setBtnStatus(!btnStatus);
                }}
                type="info"
                title="pagination"
                icon={<FontAwesomeIcon icon={faPager} />}
              />
            ) : (
              <EsButton
                onClick={() => {
                  onPrintEnable(!btnStatus);
                  setBtnStatus(!btnStatus);
                }}
                type="success"
                title="All as List"
                icon={<FontAwesomeIcon icon={faAngleDoubleDown} />}
              />
            )}
            <EsButton
              onClick={onPrint}
              icon={<FontAwesomeIcon icon={faPrint} />}
              type="cool"
            />
          </Space>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EsPrintBar;
