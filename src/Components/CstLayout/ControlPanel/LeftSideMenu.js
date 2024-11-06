import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";

import {
  DashboardOutlined,
  DesktopOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  QrcodeOutlined,
  FileImageOutlined,
  PictureOutlined,
} from "@ant-design/icons/lib/icons";
import CstActionLink from "../../EsAction/CstActionLink";

export const LeftSideMenu = (props) => {
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      onCollapse={onCollapse}
      className="control-panel-side-menu"
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
        <Menu.Item key="dashboard">
          <CstActionLink
            title="Dashboard"
            name=" Dashboard"
            to="/administrator"
            lIcon={<DashboardOutlined />}
          />
        </Menu.Item>
        <SubMenu key="product" icon={<QrcodeOutlined />} title="Product">
          <Menu.Item key="products">
            <CstActionLink
              name={` Products`}
              title="Products"
              to={`/administrator/products`}
            />{" "}
          </Menu.Item>
          <Menu.Item key="add-product">
            <CstActionLink
              name={` Add Product`}
              title="Add Product"
              to={`/administrator/add-product`}
            />
          </Menu.Item>
        </SubMenu>

        <SubMenu key="news" icon={<PictureOutlined />} title="News">
          <Menu.Item key="news-list">
            <CstActionLink
              name={` News List`}
              title="News List"
              to={`/administrator/news`}
            />{" "}
          </Menu.Item>
          <Menu.Item key="add-product">
            <CstActionLink
              name={` Add News`}
              title="Add News"
              to={`/administrator/add-news`}
            />
          </Menu.Item>
        </SubMenu>

        <SubMenu key="blog" icon={<FileImageOutlined />} title="Blogs">
          <Menu.Item key="blogs">
            <CstActionLink
              name={` Blogs`}
              title="Blogs"
              to={`/administrator/blogs`}
            />{" "}
          </Menu.Item>
          <Menu.Item key="add-blog">
            <CstActionLink
              name={` Add Blog`}
              title="Add Blog"
              to={`/administrator/add-blog`}
            />
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

LeftSideMenu.propTypes = {
  second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);
