import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";

import CstUploadFile from "@/src/Components/EsAction/CstField/CstUploadFile";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { thunkAllSpecKey } from "@/src/redux/reducer/specKeyReducer";
import { thunkAllCategory } from "@/src/redux/reducer/categoryReducer";
import { thunkAllOrganization } from "@/src/redux/reducer/organizationReducer";

import {
  faAdd,
  faPlusSquare,
  faRemove,
  faTrash,
  faTrashAlt,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { thunkAllUnit } from "@/src/redux/reducer/unitReducer";
import {
  thunkAllCity,
  thunkAllRegion,
  thunkAllRegionByCity,
} from "@/src/redux/reducer/addressReducer";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;
export const ProductForm = ({
  name = "productAdd",
  btnText = "Add",
  initForm,
  initValues = {
    aliasName: null,
    title: null,
    quantity: null,
    imageUrl: null,
    videoUrl: null,
    price: null,
    flatDiscount: null,
    clientDiscount: null,
    agentDiscount: null,
    agentCharge: null,
    isUpcoming: null,
    description: null,
    images: [{ url: null, alt: null }],
    metaDatas: [
      {
        name: null,
        content: null,
      },
    ],

    organization: null,
    category: null,
    locations: [],
    unit: null,

    specifications: [
      {
        key: null,
        value: null,
        description: null,
      },
    ],

    avgRating: null,
  },
  onSubmitAction,
  organizations = [],
  units = [],
  spcKeys = [],
  categories = [],
  cities = [],
  regions = [],
  onFailedAction,
  ...props
}) => {
  useEffect(() => {
    props.thunkAllSpecKey();
    props.thunkAllCategory();
    props.thunkAllOrganization();
    props.thunkAllUnit();
    props.thunkAllCity();
    props.thunkAllRegion();
  }, []);

  console.log("regions , ", regions);

  const regionsByCity = (locations, key) => {
    if (!isEmptyOrNull(regions) && !isEmptyOrNull(locations)) {
      if (!isEmptyOrNull(locations[key])) {
        const items = regions.filter((item) => {
          return item?.city?.code === locations[key].city;
        });
        console.log("regionsByCity, ", items);
        if (Array.isArray(items)) {
          return items;
        }
      }
    }

    return [];
  };

  const onChangeCity = (city, values, key) => {
    if (!isEmptyOrNull(values)) {
      if (!isEmptyOrNull(values.locations[key])) {
        values.locations[key].region = null;
        values.locations[key].city = city;
        initForm.setFieldsValue(values);
      }
    }
  };

  const onChangeImage = (values, key, url) => {
    if (!isEmptyOrNull(values)) {
      if (!isEmptyOrNull(values.images[key])) {
        values.images[key].url = url;
        initForm.setFieldsValue(values);
      }
    }
  };

  return (
    <React.Fragment>
      <Form
        {...layout}
        name={name}
        initialValues={initValues}
        form={initForm}
        onFinish={onSubmitAction}
        onFinishFailed={onFailedAction}
      >
        {(values) => {
          return (
            <React.Fragment>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Title !",
                  },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                label="Alias Name"
                name="aliasName"
                rules={[
                  {
                    message: "Please input Alias Name!",
                  },
                ]}
              >
                <Input placeholder="Alias Name" />
              </Form.Item>
              <Form.Item
                label="Category:"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Select Category ",
                  },
                ]}
              >
                <Select
                  placeholder="Select One"
                  showSearch={true}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories &&
                    categories.map((item) => {
                      return (
                        <Option key={`category-${item.id}`} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Organization:"
                name="organization"
                rules={[
                  {
                    required: true,
                    message: "Select Organization",
                  },
                ]}
              >
                <Select
                  placeholder="Select One"
                  showSearch={true}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {organizations &&
                    organizations.map((item) => {
                      return (
                        <Option key={`organization-${item.id}`} value={item.id}>
                          {`${item.name}, ${item?.phoneNo}`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Unit:"
                name="unit"
                rules={[
                  {
                    required: true,
                    message: "Select Unit",
                  },
                ]}
              >
                <Select
                  placeholder="Select One"
                  showSearch={true}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {units &&
                    units.map((item) => {
                      return (
                        <Option key={`unit-${item.id}`} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input quantity !",
                  },
                ]}
              >
                <Input placeholder="quantity" />
              </Form.Item>

              <Form.Item
                label="Bar-Code"
                name="barCode"
                rules={[
                  {
                    required: true,
                    message: "Please input barCode!",
                  },
                ]}
              >
                <Input placeholder="Bar Code If have" />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}
              >
                <Input placeholder="price" />
              </Form.Item>

              <Form.Item
                label="Flat Discount"
                name="flatDiscount"
                rules={[
                  {
                    message: "Please input Flat Discount!",
                  },
                ]}
              >
                <Input placeholder="Flat Discount" />
              </Form.Item>

              <Form.Item
                label="Agent Discount:"
                name="agentDiscount"
                rules={[
                  {
                    message: "Please input Agent Discount !",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Agent Discount" />
              </Form.Item>
              <Form.Item
                label="Agent Charge:"
                name="agentCharge"
                rules={[
                  {
                    message: "Please input Agent Charge !",
                  },
                ]}
              >
                <Input placeholder="Agent Charge" />
              </Form.Item>
              <Form.Item
                label="Client Discount:"
                name="clientDiscount"
                rules={[
                  {
                    message: "Please input Client Discount !",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Client Discount" />
              </Form.Item>

              <Form.Item
                label="Rating Scale:"
                name="ratingScale"
                rules={[
                  {
                    message: "Please input Rating Scale !",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Rating Scale i.e. 5,10" />
              </Form.Item>

              <Form.Item label="Description" name={`description`}>
                <TextArea placeholder="Description" />
              </Form.Item>
              <Form.Item
                label="Upcoming"
                name="isUpcoming"
                rules={[
                  {
                    message: "Select a Upcoming",
                  },
                ]}
              >
                <div className="w-48">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      name="isUpcoming"
                      block
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      defaultValue={values.gender ? values.gender : ""}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Flex>
                </div>
              </Form.Item>
              <Form.Item
                label="Anywhere"
                name="isAnywhere"
                rules={[
                  {
                    message: "Location is Anywhere",
                  },
                ]}
              >
                <div className="w-48">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      name="isAnywhere"
                      block
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      defaultValue={values.gender ? values.gender : ""}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Flex>
                </div>
              </Form.Item>
              <Form.Item
                label="Image:"
                name="imageUrl"
                rules={[
                  {
                    message: "Please upload Image!",
                  },
                ]}
              >
                <CstUploadFile
                  onChangeAction={(url) => {
                    onImageChange("imageUrl", url, values);
                  }}
                  imgLoc="products"
                />
              </Form.Item>
              <Form.Item
                label="Video Url"
                name="videoUrl"
                rules={[
                  {
                    message: "Please input Video Url !",
                  },
                ]}
              >
                <Input placeholder="Video Url" />
              </Form.Item>
              <Row gutter={[0, 20]}>
                <Col span={24}>
                  <Card title="Images">
                    <Row
                      gutter={[16, 16]}
                      className="my-3 py-2 border-b border-teal-700"
                    >
                      <Col span={9}>Title</Col>
                      <Col span={8}>Alt</Col>
                      <Col span={4}>Url</Col>
                      <Col span={1}>Action</Col>
                    </Row>
                    <Form.List name="images">
                      {(images, { add, remove }) => (
                        <>
                          <Row>
                            <Col span={24}>
                              {images.map(({ key, name, ...restField }) => (
                                <Row
                                  gutter={[16, 16]}
                                  className="my-2  border-b border-teal-700"
                                >
                                  <Col span={9}>
                                    <Form.Item
                                      wrapperCol={24}
                                      name={[name, "title"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Image title!",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Image Title" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Form.Item
                                      wrapperCol={24}
                                      {...restField}
                                      name={[name, "alt"]}
                                      rules={[
                                        {
                                          message: "Missing Image Alt",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Image Alt" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={6}>
                                    <Form.Item
                                      {...restField}
                                      wrapperCol={24}
                                      name={[name, "description"]}
                                      rules={[
                                        {
                                          message: "Missing last description",
                                        },
                                      ]}
                                    >
                                      <CstUploadFile
                                        onChangeAction={(url) =>
                                          onChangeImage(values, key, url)
                                        }
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={1}>
                                    <span className="flex flex-col justify-center items-center h-full text-red-600 text-xl cursor-pointer">
                                      {
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={() => remove(name)}
                                        />
                                      }
                                    </span>
                                  </Col>
                                </Row>
                              ))}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={6}>
                              <Form.Item>
                                <button
                                  onClick={() => add()}
                                  className="flex flex-row gap-4 border rounded-md justify-center items-center px-3 py-1 font-semibold text-white bg-teal-600 hover:bg-teal-500  "
                                >
                                  {<FontAwesomeIcon icon={faPlusSquare} />} Add
                                </button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Form.List>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Specifications">
                    <Row
                      gutter={[16, 16]}
                      className="my-3 py-2 border-b border-teal-700"
                    >
                      <Col span={8}>Specification Key</Col>
                      <Col span={4}>Value</Col>
                      <Col span={11}>Description</Col>
                      <Col span={1}>Action</Col>
                    </Row>
                    <Form.List name="specifications">
                      {(specifications, { add, remove }) => (
                        <>
                          <Row>
                            <Col span={24}>
                              {specifications.map(
                                ({ key, name, ...restField }) => (
                                  <Row
                                    gutter={[16, 16]}
                                    className="my-2  border-b border-teal-700"
                                  >
                                    <Col span={8}>
                                      <Form.Item
                                        wrapperCol={24}
                                        name={[name, "key"]}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Select specification Key!",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select One Key"
                                          style={{ width: `100%` }}
                                          showSearch={true}
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            option?.children
                                              ?.toLowerCase()
                                              .indexOf(input.toLowerCase()) >= 0
                                          }
                                        >
                                          {spcKeys &&
                                            spcKeys.map((item) => {
                                              return (
                                                <Option
                                                  key={`spcKeys-${item.id}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </Option>
                                              );
                                            })}
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item
                                        wrapperCol={24}
                                        {...restField}
                                        name={[name, "value"]}
                                        rules={[
                                          {
                                            message: "Missing Value",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Value" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                      <Form.Item
                                        {...restField}
                                        wrapperCol={24}
                                        name={[name, "description"]}
                                        rules={[
                                          {
                                            message: "Missing last description",
                                          },
                                        ]}
                                      >
                                        <TextArea placeholder="Description" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                      <span className="flex flex-col justify-center items-center h-full text-red-600 text-xl cursor-pointer">
                                        {
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => remove(name)}
                                          />
                                        }
                                      </span>
                                    </Col>
                                  </Row>
                                )
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={6}>
                              <Form.Item>
                                <button
                                  onClick={() => add()}
                                  className="flex flex-row gap-4 border rounded-md justify-center items-center px-3 py-1 font-semibold text-white bg-teal-600 hover:bg-teal-500  "
                                >
                                  {<FontAwesomeIcon icon={faPlusSquare} />} Add
                                </button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Form.List>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card title="Location's">
                    <Row
                      gutter={[16, 16]}
                      className="my-3 py-2 border-b border-teal-700"
                    >
                      <Col span={5}>City</Col>
                      <Col span={5}>Region</Col>
                      <Col span={5}>Name</Col>
                      <Col span={9}>
                        <Row>
                          <Col span={22}>Address</Col>
                          <Col span={2}></Col>
                        </Row>
                      </Col>
                    </Row>
                    <Form.List name="locations">
                      {(locations, { add, remove }) => (
                        <>
                          <Row>
                            <Col span={24}>
                              {locations.map(({ key, name, ...restField }) => (
                                <Row
                                  gutter={[16, 16]}
                                  className="my-2  border-b border-teal-700"
                                >
                                  <Col span={5}>
                                    <Form.Item
                                      wrapperCol={24}
                                      name={[name, "city"]}
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
                                        onChange={(item) => {
                                          console.log("City item, ", item);
                                          onChangeCity(item, values, key);
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
                                            return (
                                              <Option
                                                key={`city-${item.code}`}
                                                value={item.code}
                                              >
                                                {item.name}
                                              </Option>
                                            );
                                          })}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col span={5}>
                                    <Form.Item
                                      wrapperCol={24}
                                      name={[name, "region"]}
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
                                        {regionsByCity(
                                          values.locations,
                                          key
                                        ).map((item) => {
                                          return (
                                            <Option
                                              key={`region-${item.key}`}
                                              value={item.key}
                                            >
                                              {item.name}
                                            </Option>
                                          );
                                        })}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col span={5}>
                                    <Form.Item
                                      wrapperCol={24}
                                      {...restField}
                                      name={[name, "name"]}
                                      rules={[
                                        {
                                          message: "Missing name",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Name" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={9}>
                                    <Row>
                                      <Col span={22}>
                                        <Form.Item
                                          {...restField}
                                          wrapperCol={24}
                                          name={[name, "description"]}
                                          rules={[
                                            {
                                              message:
                                                "Missing last description",
                                            },
                                          ]}
                                        >
                                          <TextArea placeholder="Description" />
                                        </Form.Item>
                                      </Col>
                                      <Col span={2}>
                                        <span className="flex flex-col justify-center items-center h-full text-red-600 text-xl cursor-pointer">
                                          {
                                            <FontAwesomeIcon
                                              icon={faTrash}
                                              onClick={() => remove(name)}
                                            />
                                          }
                                        </span>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              ))}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={6}>
                              <Form.Item>
                                <button
                                  onClick={() => add()}
                                  className="flex flex-row gap-4 border rounded-md justify-center items-center px-3 py-1 font-semibold text-white bg-teal-600 hover:bg-teal-500  "
                                >
                                  {<FontAwesomeIcon icon={faPlusSquare} />} Add
                                </button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Form.List>
                  </Card>
                </Col>
              </Row>

              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 0,
                }}
              >
                <Button type="primary" htmlType="submit" className="my-4">
                  {btnText}
                </Button>
              </Form.Item>
            </React.Fragment>
          );
        }}
      </Form>
    </React.Fragment>
  );
};

ProductForm.propTypes = {
  thunkAllCategory: PropTypes.func.isRequired,
  thunkAllOrganization: PropTypes.func.isRequired,
  thunkAllSpecKey: PropTypes.func.isRequired,
  thunkAllUnit: PropTypes.func.isRequired,
  thunkAllCity: PropTypes.func.isRequired,
  thunkAllRegionByCity: PropTypes.func.isRequired,
  thunkAllRegion: PropTypes.func.isRequired,
  units: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  spcKeys: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    categories: state?.category?.categories,
    spcKeys: state?.spcKey?.specKeys,
    organizations: state?.organization?.organizations,
    units: state?.unit?.units,
    cities: state.address.cities,
    regions: state.address.regions,
  };
};

const mapDispatchToProps = {
  thunkAllCategory,
  thunkAllOrganization,
  thunkAllSpecKey,
  thunkAllUnit,
  thunkAllCity,
  thunkAllRegionByCity,
  thunkAllRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
