import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
} from "antd";
import {
  PlusSquareOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CstSelectMetaData from "../EsUtils/CstSelectMetaData";
import TextArea from "antd/lib/input/TextArea";
import CstUploadFile from "../EsAction/CstField/CstUploadFile";
import CstSunEditor from "../Editor/CstSunEditor";
import { getAllCategory } from "../../redux/action/categoryAction";

const BlogForm = ({
  initForm,
  categoryResp,
  companyResp,
  initValues,
  ...params
}) => {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    params.getAllCategory();
  }, []);

  useEffect(() => {
    if (companyResp?.status) {
      setCompanies(companyResp.response);
    }
  }, [companyResp]);

  useEffect(() => {
    if (categoryResp?.status) {
      setCategories(categoryResp.response);
    }
  }, [categoryResp]);

  const onChangeAction = (fieldName, value, values) => {
    if (fieldName) {
      values[fieldName] = value;
      initForm.setFieldsValue(values);
    }
  };

  const metaChangeAction = (metaName, idx, values) => {
    values.metaDatas[idx].name = metaName;
    initForm.setFieldsValue(values);
  };

  const imageChangeAction = (url, idx, values) => {
    values.images[idx].imageUrl = url;
    initForm.setFieldsValue(values);
  };

  return (
    <React.Fragment>
      <Card title={params.title}>
        <Form
          name={params.name}
          initialValues={initValues}
          onFinish={params.onSubmitAction}
          onFinishFailed={params.onSubmitFailed}
          autoComplete="off"
          form={initForm}
          layout="vertical"
        >
          {(values) => {
            return (
              <Row gutter={[24, 16]}>
                <Col span={24} className="plr-30">
                  <Form.Item
                    label="Name Or Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input Name !",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col span={24} className="plr-30">
                  <Form.Item
                    label="Blog Alias name as url"
                    name="aliasName"
                    rules={[
                      {
                        required: true,
                        message: "Please input Key !",
                      },
                    ]}
                  >
                    <Input placeholder="Unique" />
                  </Form.Item>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.List name="metaDatas">
                    {(fields, { add, remove }) => {
                      return (
                        <>
                          {fields.map(({ key, name, ...restField }, idx) => {
                            return (
                              <React.Fragment key={`metaDatas-${key}`}>
                                <Row gutter={[3, 8]}>
                                  <Col span={1}>{idx + 1}</Col>

                                  <Col span={5}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "content"]}
                                    >
                                      <CstSelectMetaData
                                        onChangeAction={(value) => {
                                          metaChangeAction(value, name, values);
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col span={17}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "content"]}
                                    >
                                      <Input placeholder="Meta Content" />
                                    </Form.Item>
                                  </Col>

                                  <Col span={1}>
                                    <DeleteFilled
                                      onClick={() => remove(name)}
                                    />
                                  </Col>
                                </Row>
                              </React.Fragment>
                            );
                          })}
                          <Row>
                            <Col span={2}>
                              <Button
                                type="primary"
                                onClick={() => {
                                  add({ name: "", content: "" });
                                }}
                              >
                                <PlusSquareOutlined /> Add Meta Datas
                              </Button>
                            </Col>
                          </Row>
                        </>
                      );
                    }}
                  </Form.List>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.Item label="Category" name={`category`}>
                    <Select
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
                </Col>
                <Col span={24} className="plr-30">
                  <Form.Item label="Company" name={`company`}>
                    <Select
                      showSearch={true}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option?.children
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {companies &&
                        companies.map((item) => {
                          return (
                            <Option key={`company-${item.id}`} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.Item label="Content" name="content">
                    <CstSunEditor
                      onChange={(value) => {
                        onChangeAction("content", value, values);
                      }}
                      height={300}
                    />
                  </Form.Item>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.Item
                    label="Short Content Or Text"
                    name={`shortContent`}
                  >
                    <TextArea placeholder="Short Content" />
                  </Form.Item>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.List name="images">
                    {(fields, { add, remove }) => {
                      return (
                        <>
                          <Row gutter={[12, 20]}>
                            {fields.map(({ key, name, ...restField }, idx) => {
                              return (
                                <React.Fragment key={`images-${key}`}>
                                  <Col>
                                    <Card>
                                      <Row gutter={[8, 16]}>
                                        <Col span={1}>{idx + 1}</Col>

                                        <Col span={6}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "name"]}
                                          >
                                            <Input placeholder="Image Name" />
                                          </Form.Item>
                                        </Col>

                                        <Col span={6}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "title"]}
                                          >
                                            <Input placeholder="Image Title" />
                                          </Form.Item>
                                        </Col>

                                        <Col span={5}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "altTag"]}
                                          >
                                            <Input placeholder="Alt Tag" />
                                          </Form.Item>
                                        </Col>

                                        <Col span={5}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "location"]}
                                          >
                                            <Input placeholder="Image location" />
                                          </Form.Item>
                                        </Col>
                                        <Col
                                          span={1}
                                          style={{ textAlign: "center" }}
                                        >
                                          <DeleteFilled
                                            onClick={() => remove(name)}
                                          />
                                        </Col>

                                        <Col span={17} offset={1}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "imageUrl"]}
                                          >
                                            <Input placeholder="Image Url" />
                                          </Form.Item>
                                        </Col>
                                        <Col span={3}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "imageFile"]}
                                          >
                                            <CstUploadFile
                                              onChangeAction={(url) => {
                                                imageChangeAction(
                                                  url,
                                                  name,
                                                  values
                                                );
                                              }}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                            <Col span={24}>
                              <Row>
                                <Col>
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      add({});
                                    }}
                                  >
                                    <PlusSquareOutlined /> Add Image
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </>
                      );
                    }}
                  </Form.List>
                </Col>

                <Col span={24} className="plr-30">
                  <Form.Item
                    wrapperCol={{
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit" block>
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            );
          }}
        </Form>
      </Card>
    </React.Fragment>
  );
};

BlogForm.propTypes = {
  categoryResp: PropTypes.object,
  companyResp: PropTypes.object,
  getAllCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    categoryResp: state?.category?.categories,
    companyResp: state?.company?.companies,
  };
};

const mapDispatchToProps = { getAllCategory };

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm);
