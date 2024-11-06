"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { adminOrganizationCols } from "@/src/utils/ui/cols/organization-cols";
import { thunkAllOrganization } from "@/src/redux/reducer/organizationReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const OrganizationTable = ({ organizationsResp = [], isAction = false, ...props }) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    props.thunkAllOrganization();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(organizationsResp)) {
      setOrganizations(organizationsResp);
    }
  }, [organizationsResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={organizations}
          columns={adminOrganizationCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

OrganizationTable.propTypes = {
  thunkAllOrganization: PropTypes.func.isRequired,
  organizationsResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organizationsResp: state.organization.organizations,
  };
};

const mapDispatchToProps = {
  thunkAllOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTable);
