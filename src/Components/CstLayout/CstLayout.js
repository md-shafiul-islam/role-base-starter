import React, { useEffect, useState } from "react";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { Drawer, Button, Col, Row, Menu } from "antd";
import { SearchOutlined, MenuFoldOutlined } from "@ant-design/icons/lib/icons";
import TopNav from "./TopNav";
import "./CstLayout.module.css";
import LeftSideMenu from "./ControlPanel/LeftSideMenu";
import { useRouter } from "next/router";
import { getCurrentActiveRout } from "../../utils/ui/routerBaseEsFnc";
import Link from "next/link";
import FooterPlacement from "./FooterPlacement";
import CstActionLink from "../EsAction/CstActionLink";
import CstAntAutoComplete from "../Search/CstAntAutoComplete";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import CstPopOver from "./CstPopOver";

const CstLayout = ({ children, ...params }) => {
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [isRouterPush, setIsRouterPush] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const route = getCurrentActiveRout(router.asPath);
    if (route.includes("administrator")) {
      setIsAdministrator(true);
    }
  }, []);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearchChangeAction = (item) => {
    if (isRouterPush) {
      setIsRouterPush(false);
    }
  };
  const onSearchKeyAction = (search) => {
    let matchStatus = false;
    if (!isEmptyOrNull(search?.text) && !isEmptyOrNull(search?.item)) {
      if (search.text === search.item.key) {
        matchStatus = true;
      }
    }

    if (!isRouterPush) {
      if (matchStatus) {
        setIsRouterPush(true);
        router.push({ pathname: "/search", query: { name: search.text } });
      } else {
        setIsRouterPush(true);
        router.push({ pathname: "/search", query: { name: search.text } });
      }
    }
  };
  const onSearchSelectAction = (item) => {
    if (!isRouterPush) {
      setIsRouterPush(true);
      router.push({ pathname: "/search", query: { name: item } });
    }
  };
  return (
    <>
      <Layout className="main-layout">
        <Header className="main-header">
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 16 }}
              xxl={{ span: 16 }}
            >
              <Row align="center">
                <Col
                  xs={{ span: 14 }}
                  sm={{ span: 14 }}
                  md={{ span: 10 }}
                  lg={{ span: 8 }}
                  xl={{ span: 5 }}
                  xxl={{ span: 5 }}
                >
                  <h3 style={{ color: "#fff" }} className="nav-site-name">
                    <CstActionLink
                      clazzName="gearotg-title-class"
                      name={`Gear on the GO`}
                      title={`Gear ON THE GO`}
                      to="/"
                    />
                  </h3>
                </Col>
                <Col
                  xs={{ span: 10 }}
                  sm={{ span: 10 }}
                  md={{ span: 14 }}
                  lg={{ span: 16 }}
                  xl={{ span: 19 }}
                  xxl={{ span: 19 }}
                >
                  <div className="mobileHidden">
                    <TopNav title={"top nav"} />
                  </div>
                  <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                      <MenuFoldOutlined style={{ fontSize: "25px" }} />
                    </Button>
                    <Drawer
                      width={250}
                      title="Menu"
                      placement="right"
                      onClose={onClose}
                      open={visible}
                    >
                      <Menu
                        mode={"vertical"}
                        selectedKeys="d-home"
                        theme="light"
                      >
                        <Menu.Item key="d-home">
                          <CstActionLink name="Home" title="Home" to="/" />
                        </Menu.Item>

                        <Menu.Item key="d-mobiles">
                          <CstActionLink
                            name="Mobiles"
                            title="Mobiles"
                            to="/mobiles"
                          />
                        </Menu.Item>

                        <Menu.Item key="d-ablets">
                          <CstActionLink
                            name="Tablets"
                            title="Tablets"
                            to="/tablets"
                          />
                        </Menu.Item>

                        <Menu.Item key="d-smart-watches">
                          <CstActionLink
                            name="Smart Watches"
                            title="Smart Watches"
                            to="/smart-watches"
                          />
                        </Menu.Item>
                        <Menu.Item key="brands">
                          <CstActionLink
                            name="Brands"
                            title="Brands"
                            to="/brands"
                          />
                        </Menu.Item>
                        {/* <Menu.Item key="d-blogs">
                      <CstActionLink name="Blog" title="Blog" to="/blogs" />
                    </Menu.Item>

                    <Menu.Item key="d-videos">
                      <CstActionLink
                        name="Videos"
                        title="Videos"
                        to="/videos"
                      />
                    </Menu.Item> */}
                      </Menu>
                    </Drawer>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 8 }}
              xxl={{ span: 8 }}
            >
              <Row align="center">
                <Col span={21}>
                  <CstAntAutoComplete
                    onSelectAction={onSearchSelectAction}
                    onChangeAction={onSearchChangeAction}
                    keySearchAction={onSearchKeyAction}
                  />
                </Col>
                <Col span={2}>
                  <Button icon={<SearchOutlined />} size="large" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Layout>
          {isAdministrator ? <LeftSideMenu /> : ""}
          <Content>{children}</Content>
        </Layout>
        <Footer style={{ padding: 0, margin: 0 }}>
          <CstPopOver />
          <FooterPlacement />
        </Footer>
      </Layout>
    </>
  );
};

export default CstLayout;
