"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row, Tabs } from "antd";
import {
  thunkAllAddress,
  thunkAddress,
  thunkUpdateAddress,
} from "@/src/redux/reducer/addressReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import AddressForm from "@/src/Components/Address/AddressForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import CityTable from "@/src/Components/Address/CityTable";
import RegionTable from "@/src/Components/Address/RegionTable";
import AddressTable from "@/src/Components/Address/AddressTable";

const AddressTabs = ({
  addressResp,
  roleAccess,
  addressesResp,
  addressUpdateResp,
  addressRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [addressAccess, setAddressAccess] = useState({});

  const [addressUpdateKey, setAddressUpdateKey] = useState(
    `${Math.random() * 11148674}-address-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-address-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(addressesResp)) {
      setAddresses(addressesResp);
    } else {
      props.thunkAllAddress();
    }
  }, [addressesResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setAddressAccess(roleAccess?.address);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkAddress(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(addressResp)) {
      setAddress(addressResp.response);
      setIsLoading(false);
      if (addressResp.status) {
        if (isEmptyOrNull(addressResp.response)) {
          redirect("/administrator/addresss");
        }
      }
    }
  }, [addressResp]);

  const onRemove = () => {
    if (addressAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (addressAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (addressAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "address removing",
        `Removing '${address?.name}' address`
      );

      props.thunkRemoveaddress(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (addressAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        addressUpdateKey,
        "Sending address Update Request...",
        "Please, wait address Updating..."
      );
      values.id = id;
      props.thunkUpdateaddress(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", addressUpdateResp);
      if (addressUpdateResp.status) {
        getUpdatedNotification(
          "success",
          addressUpdateKey,
          "Sending address Update Request...",
          addressUpdateResp.message
        );
        props.thunkAddress(id);
      } else {
        getUpdatedNotification(
          "error",
          addressUpdateKey,
          "Sending address Add Request...",
          addressUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [addressUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (addressRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending address Removed Request...",
          addressRemoveResp.message
        );
        redirect("/administrator/addresss");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending address Removed...",
          addressRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [addressRemoveResp]);

  const tabItem = () => {
    return [
      {
        label: <span>Address</span>,
        key: "address",
        children: (
          <>
            <AddressTable />
          </>
        ),
      },
      {
        label: <span>Region</span>,
        key: "region",
        children: (
          <>
            <RegionTable />
          </>
        ),
      },
      {
        label: <span>City</span>,
        key: "city",
        children: (
          <>
            <CityTable />
          </>
        ),
      },
    ];
  };

  return (
    <React.Fragment>
      <EsViewModal
        isOpen={isOpen}
        handleOk={() => {
          setIsOpen(false);
        }}
        btnName="Close"
        isClosable={false}
      >
        <AddressForm
          title="Update address"
          initForm={form}
          addresss={address}
          name="address"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={address}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this address?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{address?.name}</span>
            <span>{address?.description}</span>
          </div>
        }
      />
      <Card className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <Tabs defaultActiveKey="address" type="card" items={tabItem()} />
            </Col>
          </Row>
        )}
      </Card>
    </React.Fragment>
  );
};

AddressTabs.propTypes = {
  thunkAddress: PropTypes.func.isRequired,
  thunkUpdateAddress: PropTypes.func.isRequired,
  thunkAllAddress: PropTypes.func.isRequired,
  addressResp: PropTypes.object,
  addressUpdateResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    addressResp: state.address.address,
    addressesResp: state.address.addresses,
    roleAccess: state.role.userAccess,
    addressUpdateResp: state.address.update,
    addressRemoveResp: state.address.remove,
  };
};

const mapDispatchToProps = {
  thunkAddress,
  thunkAllAddress,
  thunkUpdateAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressTabs);
