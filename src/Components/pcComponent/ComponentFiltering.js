import { Card, Col, Input, Row, Slider } from "antd";
import React from "react";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const componentFiltering = () => {
  const onChange = (value) => {
    esFrontLogger.info("onChange ", value);
  };
  const onAfterChange = (value) => {
    esFrontLogger.info("onAfterChange", value);
  };

  return (
    <>
      <Row>
        <Card title="Price Range">
          <Row>
            <Col>
              <Slider
                range={{ draggableTrack: true }}
                step={1}
                min={0}
                max={400000}
                defaultValue={[5000, 50000]}
                onChange={onChange}
                onAfterChange={onAfterChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <Input type="number" placeholder="Min" size="small" />
                </Col>
                <Col span={6} offset={12}>
                  <Input type="number" placeholder="Max" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default componentFiltering;
