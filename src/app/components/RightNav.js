"use client";
import { Avatar, Dropdown, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneLock,
  faRoadLock,
  faShopLock,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

export const RightNav = ({ ...props }) => {
    
  const onClickAvatar = (e) => {
    console.log("onClickAvatar ", e);
  };

  const onLogOut = (e) => {
    console.log("onLogOut ", e);
  };
  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: <span onClick={onLogOut}>Log Out</span>,
      icon: <FontAwesomeIcon icon={faUserLock} />,
    },
  ];

  return (
    <div>
      <Dropdown
        trigger={["click"]}
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              onClick={onClickAvatar}
              size={{
                xs: 24,
                sm: 32,
                md: 38,
                lg: 45,
                xl: 50,
                xxl: 55,
              }}
              icon={<AntDesignOutlined />}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

RightNav.propTypes = {
  second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
