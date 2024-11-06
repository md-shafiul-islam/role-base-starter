"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStakeholderCols } from "@/src/utils/ui/cols/stakholder-cols";
import { thunkAllStakeholder } from "@/src/redux/reducer/stakeholderReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const StakeholderTable = ({
  stakeholdersResp = [],
  isAction = false,
  ...props
}) => {
  const [stakeholders, setStakeholders] = useState([]);

  useEffect(() => {
    props.thunkAllStakeholder();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(stakeholdersResp)) {
      setStakeholders(stakeholdersResp);
    }
  }, [stakeholdersResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={stakeholders}
          columns={getStakeholderCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

StakeholderTable.propTypes = {
  thunkAllStakeholder: PropTypes.func.isRequired,
  stakeholdersResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    stakeholdersResp: state.stakeholder.stakeholders,
  };
};

const mapDispatchToProps = {
  thunkAllStakeholder,
};

export default connect(mapStateToProps, mapDispatchToProps)(StakeholderTable);
