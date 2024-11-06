import { Card, Col, Row } from "antd";
import React, { Suspense } from "react";

const generalNotFoundThankPage = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading ... </div>}>
        <Row>
          <Col span={24} className="box-border px-9 mt-9 ">
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Card>
                  <div className="flex flex-col justify-center items-center py-10 h-screen">
                    <div>
                      <i className="fa-solid fa-circle-check text-4xl text-green-800 py-1"></i>
                    </div>
                    <div className="flex flex-col justify-center items-center text-2xl font-bold py-1">
                      Thank for trying :)
                    </div>

                    <p>
                      <a href="/" className="text-lg">
                        Back Home
                      </a>
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Suspense>
    </React.Fragment>
  );
};

export default generalNotFoundThankPage;
