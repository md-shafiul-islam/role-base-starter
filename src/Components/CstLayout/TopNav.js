import React, { useState } from "react";
import { Col, Menu, Row } from "antd";
import CstActionLink from "../EsAction/CstActionLink";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const TopNav = ({ title, ...params }) => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    esFrontLogger.info("Menu Click action, ", e);
  };
  return (
    <React.Fragment>
      <div className="mobileHidden">
        <Row>
          <Col span={24} className="top-nav-bar">
            <Menu mode={"horizontal"} selectedKeys="Home" theme="dark">
              <Menu.Item key="home">
                <CstActionLink name="Home" title="Home" to="/" />
              </Menu.Item>

              <Menu.Item key="mobiles">
                <CstActionLink name="Mobiles" title="Mobiles" to="/mobiles" />
              </Menu.Item>

              <Menu.Item key="tablets">
                <CstActionLink name="Tablets" title="Tablets" to="/tablets" />
              </Menu.Item>

              <Menu.Item key="smart-watches">
                <CstActionLink
                  name="Smart Watches"
                  title="Smart Watches"
                  to="/smart-watches"
                />
              </Menu.Item>
              <Menu.Item key="brands">
                <CstActionLink name="Brands" title="Brands" to="/brands" />
              </Menu.Item>

              {/* <Menu.Item key="blogs">
                <CstActionLink name="Blog" title="Blog" to="/blogs" />
              </Menu.Item>

              <Menu.Item key="videos">
                <CstActionLink name="Videos" title="Videos" to="/videos" />
              </Menu.Item>*/}
            </Menu>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default TopNav;
