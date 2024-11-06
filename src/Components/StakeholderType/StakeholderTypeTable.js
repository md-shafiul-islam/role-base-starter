"use client";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStakeholderTypeCols } from "@/src/utils/ui/cols/stakholder-cols";

import {
  thunkAddStakeholderType,
  thunkAllStakeholderType,
} from "@/src/redux/reducer/stakeholderTypeReducer";

import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const StakeholderTypeTable = ({
  stakeholderTypeResp = [],
  isAction = false,
  ...props
}) => {
  const [stakeholderTypes, setStakeholderTypes] = useState([]);

  useEffect(() => {
    props.thunkAllStakeholderType();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(stakeholderTypeResp)) {
      setStakeholderTypes(stakeholderTypeResp);
    }
  }, [stakeholderTypeResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={stakeholderTypes}
          columns={getStakeholderTypeCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

StakeholderTypeTable.propTypes = {
  thunkAllStakeholderType: PropTypes.func.isRequired,
  stakeholderTypeResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    stakeholderTypeResp: state.stakeType.stakeholderTypes,
  };
};

const mapDispatchToProps = {
  thunkAllStakeholderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderTypeTable);
