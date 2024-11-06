"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { adminUserCols } from "@/src/utils/ui/cols/user-cols";
import { thunkAllUser } from "@/src/redux/reducer/userReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const UserTable = ({ usersResp = [], isAction = false, ...props }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.thunkAllUser();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(usersResp)) {
      setUsers(usersResp);
    }
  }, [usersResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={users}
          columns={adminUserCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

UserTable.propTypes = {
  thunkAllUser: PropTypes.func.isRequired,
  usersResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    usersResp: state.user.users,
  };
};

const mapDispatchToProps = {
  thunkAllUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
