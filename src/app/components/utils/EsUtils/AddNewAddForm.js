"use client";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { isEmptyOrNull } from "../Action/esFunc/gen-es/esCheckFunc";
import {
  thunkAddAddress,
  thunkAllCity,
  thunkAllZoneArea,
  thunkAllZoneByCity,
  thunkGetAllStakholderAddress,
  thunkSearchAddresByWords,
  restAdded,
} from "@/src/redux/reducer/addressReducer";

const AddNewAddForm = ({
  stakeholder,
  cities,
  zones,
  areas,
  address,
  onCloseAction,
  suggestionAreas,
  addAddress,
  title,
  ...props
}) => {
  const [form] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmptyOrNull(cities)) {
      if (isEmptyOrNull(cities.response)) {
        props.thunkAllCity();
      }
    } else {
      props.thunkAllCity();
    }
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(addAddress)) {
      if (addAddress.status) {
        props.thunkGetAllStakholderAddress(stakeholder);
        form.resetFields();
        dispatch(restAdded());
        onCloseAction();
      }
    }
  }, [addAddress]);

  const submitAction = (address) => {
    address.stakeholder = stakeholder;
    props.thunkAddAddress(address);
  };

  const onFinishFailed = (values) => {
    //esBackLogger.info("onFinishFailed ", values);
  };

  const onValuesChangeAction = (value, values) => {
    //esBackLogger.info("values, ", values);
    if (value.hasOwnProperty("address")) {
      splitAddressAndSearch(value.address);
    }

    if (value.hasOwnProperty("city")) {
      values.zone = null;
      values.area = null;
    }

    if (value.hasOwnProperty("zone")) {
      values.area = null;
    }
  };

  const splitAddressAndSearch = (address) => {
    if (!isEmptyOrNull(address)) {
      let comaWord = [],
        spcWords = [];
      if (address.includes(",") || address.includes(" ")) {
        if (address.includes(",")) {
          comaWord = address.split(",");
        } else {
          spcWords = address.split(" ");
        }
      }

      const scNwords = [];
      const cWords = [];
      if (comaWord.length > 0) {
        comaWord.forEach((word) => {
          if (word.length > 0) {
            cWords.push(word);
          }
        });
      } else if (spcWords.length > 0) {
        const regex = /,/gi;
        spcWords.forEach((word) => {
          let lWord = word.replaceAll(regex, "");
          if (lWord.length > 0) {
            scNwords.push(lWord);
          }
        });
      }

      if (cWords.length > 0 || scNwords.length > 0) {
        if (cWords.length > scNwords.length) {
          // props.thunkSearchAddresByWords(cWords);
        } else {
          // props.thunkSearchAddresByWords(scNwords);
        }
      }
    }
  };

  const onCityChangeAction = (value, option) => {
    props.thunkAllZoneByCity(option);
  };

  const onZoneChangeAction = (value, option) => {
    props.thunkAllZoneArea(option);
  };

  const onAreaChangeAction = (value, option) => {
    // props.th
  };
  return (
    <React.Fragment>
      <Col span={24}>
        <Form
          form={form}
          layout="vertical"
          size={"middle"}
          onFinish={submitAction}
          onFinishFailed={onFinishFailed}
          name="add_address"
          onValuesChange={onValuesChangeAction}
        >
          {(values) => {
            return (
              <React.Fragment>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                      name={`fullName`}
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please, Enter Full name",
                        },
                      ]}
                    >
                      <Input placeholder="Full Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                      name={`phoneNo`}
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please, Enter Phone No",
                        },
                      ]}
                    >
                      <Input placeholder="Phone No." />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item name={`phoneNoOpt`} label="Phone (Optional)">
                      <Input placeholder="Secendary Phone No. If have" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                      name="city"
                      label="District/City"
                      rules={[
                        {
                          required: true,
                          message: "Please, Select One District/City",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select City Or District"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                          )
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={cities}
                        onChange={onCityChangeAction}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                      name="zone"
                      label="Thana/Upazila"
                      rules={[
                        {
                          required: true,
                          message: "Please, Select One Zone/Thana/Upazila",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select Zone"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                          )
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={zones}
                        onChange={onZoneChangeAction}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                      name="area"
                      label="Area (এক্সাক্ট ম্যাচ না পেলে পাশের এলাকা দিন। পার্সেল হোমডেলিভারিতেই পাবেন)"
                      rules={[
                        {
                          required: true,
                          message: "Please, Select One Area",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select Area"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                          )
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={areas}
                        onChange={onAreaChangeAction}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item name={`fullAddress`} label="Full Address">
                      <TextArea
                        className="h-32"
                        placeholder="Landmark, Thana/Upazila, District/City. Division."
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Space>
                    <Button danger onClick={onCloseAction}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Space>
                </Form.Item>
              </React.Fragment>
            );
          }}
        </Form>
      </Col>
    </React.Fragment>
  );
};

AddNewAddForm.propTypes = {
  thunkSearchAddresByWords: PropTypes.func.isRequired,
  thunkAllCity: PropTypes.func.isRequired,
  thunkAllZoneByCity: PropTypes.func.isRequired,
  thunkAllZoneArea: PropTypes.func.isRequired,
  thunkAddAddress: PropTypes.func.isRequired,
  thunkGetAllStakholderAddress: PropTypes.func.isRequired,
  cities: PropTypes.object,
  zones: PropTypes.object,
  areas: PropTypes.object,
  address: PropTypes.object,
  addAddress: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cities: state.address.cities,
    zones: state.address.zones,
    areas: state.address.areas,
    address: state.address.stakeholder,
    addAddress: state.address.added,
  };
};

const mapDispatchToProps = {
  thunkSearchAddresByWords,
  thunkAllCity,
  thunkAllZoneByCity,
  thunkAllZoneArea,
  thunkAddAddress,
  thunkGetAllStakholderAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddForm);
