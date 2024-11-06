"use client";

import React, { useState } from "react";
import RightNav from "@/src/app/components/RightNav";
import { Avatar, Button, Col, Layout, Row, theme } from "antd";

import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import VerticalNav from "../components/VerticalNav";
import { SessionProvider } from "next-auth/react";

const { Header, Content } = Layout;

export default function AdministratorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <React.Fragment>
      <SessionProvider>
        <Layout>
          <VerticalNav collapsed={collapsed} isAdmin={true} />
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Row>
                <Col span={1}>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                </Col>
                <Col span={23}>
                  <div className="flex flex-row justify-between">
                    <div className=""></div>
                    <div className="mr-6">
                      <RightNav />
                    </div>
                  </div>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </SessionProvider>
    </React.Fragment>
  );
}
