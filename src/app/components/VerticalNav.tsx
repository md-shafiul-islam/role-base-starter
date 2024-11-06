"use client";

import React, { useEffect, useState } from "react";

import {
  FileAddOutlined,
  FileUnknownOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Layout, Menu, MenuProps } from "antd";

import CstActionLink from "./utils/Action/CstActionLink";

import { thunkAllMenus } from "@/src/redux/reducer/menuReducer";
import { thunkRoleAccess } from "@/src/redux/reducer/roleReducer";
import { isEmptyOrNull } from "./utils/Action/esFunc/gen-es/esCheckFunc";
import LoadingSpinner from "./utils/loading/LoadingSpinner";

const { Sider } = Layout;

const VerticalNav = ({
  collapsed = false,
  isAdmin = false,
  menus,
  roleAccess,
  ...params
}) => {
  const [isReady, setIsReady] = useState(true);

  const [openItemKeys, setOpenItemKeys] = useState([]);

  const [genMenuItems, setGenMenuItems] = useState([]);

  const url = isAdmin ? "/administrator" : "/";

  useEffect(() => {
    params.thunkAllMenus();
    params.thunkRoleAccess();
  }, []);

  const isKeyExist = (key: string) => {
    if (openItemKeys.includes(key)) {
      return true;
    }
    return false;
  };

  const onOpenChangeAction: MenuProps["onOpenChange"] = (keys) => {
    setOpenItemKeys(keys);
  };

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      populateAccess();
    }
  }, [roleAccess, openItemKeys]);

  const populateAccess = () => {
    const mAccess = {};
    roleAccess?.response?.forEach((ac: any) => {
      mAccess[ac.menuKey] = ac;
    });

    populateSubItems(mAccess);
  };

  const populateSubItems = (access: any) => {
    const menuItems = [];
    menus.forEach((parent: any, pIdx: number) => {
      const subItems = [];
      const itemAccess = access[parent.key];

      if (!isEmptyOrNull(itemAccess) && itemAccess.isActive) {
        if (
          itemAccess?.isView ||
          itemAccess?.isAll ||
          itemAccess?.isAdd ||
          itemAccess?.isApprove ||
          itemAccess?.isEdit ||
          itemAccess?.isRemove ||
          itemAccess?.isAuth
        ) {
          const item = {
            key: parent.key,
            icon: (
              <i
                className={
                  !isEmptyOrNull(parent.className)
                    ? parent.className
                    : isKeyExist(parent.key)
                    ? " fa-regular fa-folder-open "
                    : " fa-regular fa-folder "
                }
              >
                {" "}
              </i>
            ),
            label: <span>{parent.title}</span>,
            children: [],
          };

          if (
            itemAccess?.isView ||
            itemAccess?.isAll ||
            itemAccess?.isAdd ||
            itemAccess?.isApprove ||
            itemAccess?.isEdit ||
            itemAccess?.isRemove
          ) {
            subItems.push({
              label: (
                <CstActionLink
                  title="All"
                  to={`${url}${parent.url}`}
                  name={`${parent.title}s`}
                />
              ),

              icon: <UnorderedListOutlined />,
              key: `${parent.key}-all`,
            });
          }

          if (itemAccess?.isAll || itemAccess?.isAdd) {
            subItems.push({
              label: (
                <CstActionLink
                  name="Add"
                  to={`${url}${parent.url}/add`}
                  title={`${parent.title} Add`}
                />
              ),
              icon: <FileAddOutlined />,
              key: `${parent.key}-add`,
            });
          }

          if (itemAccess?.isAll || itemAccess?.isApprove) {
            subItems.push({
              label: (
                <CstActionLink
                  name="Inactive"
                  to={`${url}${parent.url}/inactives`}
                  title={`${parent.key}-inactive`}
                />
              ),
              icon: <FileUnknownOutlined />,
              key: `${parent.key}-inactive`,
            });
          }

          if (subItems.length > 0) {
            item.children = subItems;
          }

          menuItems.push(item);
        }
      }
    });

    setGenMenuItems(menuItems);
    setIsReady(false);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="min-h-screen"
    >
      <div className="demo-logo-vertical overflow-y-auto" />
      {isReady ? (
        <div className="w-full h-screen">
          <LoadingSpinner isActive={isReady} className="h-screen" />
        </div>
      ) : (
        <Menu
          className="v-menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          items={genMenuItems}
          onOpenChange={onOpenChangeAction}
        />
      )}
    </Sider>
  );
};

VerticalNav.propTypes = {
  thunkAllMenus: PropTypes.func.isRequired,
  thunkRoleAccess: PropTypes.func.isRequired,
  menus: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state: any) => {
  return {
    menus: state.menu.menus,
    roleAccess: state.role.access,
  };
};

const mapDispatchToProps = {
  thunkAllMenus,
  thunkRoleAccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalNav);
