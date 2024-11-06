import React from "react";
import { Content } from "antd/es/layout/layout";

import { Col, Row, Card } from "antd";

import CstActionItem from "../../Components/EsAction/CstActionItem";
import HeaderSerch from "../components/shop/HeaderSerch";
import HeaderRightCard from "../components/shop/HeaderRightCard";

export default function ShopRootLayout({ children }) {
  return (
    <React.Fragment>
      <header className="box-border !m-0 !p-0 w-full">
        <Content className="box-border">
          <Row>
            <Col span={24}>
              <nav className="h-12 bg-gray-900 box-border">
                <Row align={"middle"} justify={"center"}>
                  <Col xs={6} sm={6} md={6} lg={5} xl={5} xxl={5}>
                    <div className="logo text-lg text-white px-5 flex-none w-60 font-semibold sm:text-sm">
                      <CstActionItem actionUrl="/">
                        <h2 className="text-white  ">
                          <span className="hover:border-b-2">
                            {" "}
                            CM<span className="text-orange-700">System</span>
                          </span>
                        </h2>
                      </CstActionItem>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={15} xl={15} xxl={15}>
                    <div className="search flex-grow-1 flex-auto px-3 py-1">
                      <HeaderSerch text="Search " />
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
                    <Row>
                      <Col span={22}>
                        <HeaderRightCard />
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                  </Col>
                </Row>
              </nav>
            </Col>
          </Row>
        </Content>
      </header>
      <main className="box-border !m-0 !p-0">
        <Row>
          <Col span={24} className="box-border">
            {children}
          </Col>
        </Row>
      </main>
    </React.Fragment>
  );
}
