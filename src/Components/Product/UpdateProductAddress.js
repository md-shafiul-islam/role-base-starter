import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Form, Input, Select, Space } from "antd";
import {
  thunkAllCity,
  thunkAllRegion,
} from "@/src/redux/reducer/addressReducer";

import { connect } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const UpdateProductAddress = ({
  title = "Update Product Address",
  name = "location",
  onSubmitAction,
  onFailedAction,
  initValues = {},
  cities = [],
  regions = [],
  btnText,
  onCancel,
  location,
  ...props
}) => {
  const [form] = Form.useForm();

  const [cityCode, setCityCode] = useState(null);
  useEffect(() => {
    props.thunkAllCity();
    props.thunkAllRegion();
  }, []);

  useEffect(() => {
    changeCityCode(location.city);
  }, [location, cities]);

  const changeCityCode = (name) => {
    const city = cities.find((item) => {
      return item.name === name;
    });
    if (!isEmptyOrNull(city)) {
      setCityCode(city?.code);
    }
  };

  const regionsByCity = (values) => {
    if (!isEmptyOrNull(regions) && !isEmptyOrNull(values)) {
      const items = regions.filter((item) => {
        return item?.city?.code === cityCode;
      });
      if (Array.isArray(items)) {
        return items;
      }
    }

    return [];
  };

  const onChangeCity = (city, values) => {
    
    changeCityCode(city);
    if (!isEmptyOrNull(values)) {
      values.city = city;
      values.region = null;
      form.setFieldsValue(values);
    }
  };
  return (
    <React.Fragment>
      <Card title={title}>
        <Form
          {...layout}
          name={name}
          onFinish={onSubmitAction}
          onFinishFailed={onFailedAction}
          autoComplete="off"
          form={form}
          layout="horizontal"
          initialValues={location}
        >
          {(values) => {
            return (
              <React.Fragment>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Select City!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select One City"
                    style={{ width: `100%` }}
                    showSearch={true}
                    onChange={(city) => {
                      onChangeCity(city, values);
                    }}
                    onSelect={(item) => {
                      console.log("City Select Item, ", item);
                    }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {cities &&
                      cities.map((item) => {
                        console.log("City ", item);
                        return (
                          <Option key={`city-${item.name}`} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Region"
                  name="region"
                  rules={[
                    {
                      required: true,
                      message: "Select Region!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select One Region"
                    style={{ width: `100%` }}
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {regionsByCity(values).map((item) => {
                      return (
                        <Option key={`region-${item._id}`} value={item._id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      message: "Missing name",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      message: "Missing last description",
                    },
                  ]}
                >
                  <TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      {btnText}
                    </Button>
                    <Button
                      type="primary"
                      variant="solid"
                      danger
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </React.Fragment>
            );
          }}
        </Form>
      </Card>
    </React.Fragment>
  );
};

UpdateProductAddress.propTypes = {
  cities: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cities: state.address.cities,
    regions: state.address.regions,
  };
};

const mapDispatchToProps = { thunkAllCity, thunkAllRegion };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProductAddress);
