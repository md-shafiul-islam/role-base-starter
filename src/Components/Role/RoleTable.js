"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { adminRoleCols } from "@/src/utils/ui/cols/role-cols";

import { thunkAllRole } from "@/src/redux/reducer/roleReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const RoleTable = ({ rolesResp = [], isAction = false, ...props }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    props.thunkAllRole();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(rolesResp)) {
      setRoles(rolesResp);
    }
  }, [rolesResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={roles}
          columns={adminRoleCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

RoleTable.propTypes = {
  thunkAllRole: PropTypes.func.isRequired,
  rolesResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    rolesResp: state.role.roles,
  };
};

const mapDispatchToProps = {
  thunkAllRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleTable);
