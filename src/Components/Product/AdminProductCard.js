"use client";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import {
  thunkAddProductLocation,
  thunkProduct,
  thunkProductToggleActive,
  thunkRemoveProductLocation,
  thunkUpdateProductLocation,
} from "@/src/redux/reducer/productReducer";
import { Col, Rate, Row, Space, Table } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  productLoactionCols,
  productSpecificationsCols,
} from "@/src/utils/ui/cols/products-cols";

import ProductPropertyItem from "@/src/Components/Product/ProductPropertyItem";
import Card from "antd/es/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAddressBook,
  faAddressCard,
  faClock,
  faClockFour,
  faClockRotateLeft,
  faLock,
  faPlusSquare,
  faTableCellsRowLock,
  faUnlockKeyhole,
  faUserCog,
  faUserLargeSlash,
} from "@fortawesome/free-solid-svg-icons";

import EsDateFormat from "@/src/Components/EsUtils/EsDateFormat";
import EsButton from "@/src/Components/EsUtils/EsButton";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import ProductSpecificationForm from "@/src/Components/Product/ProductSpecificationForm";
import ProductAddress from "@/src/Components/Product/ProductAddress";
import UpdateProductAddress from "@/src/Components/Product/UpdateProductAddress";

import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";
import {
  thunkAddSpecification,
  thunkRemoveSpecification,
  thunkUpdateSpecification,
} from "@/src/redux/reducer/specificationReducer";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";

export const AdminProductCard = ({
  id,
  product,
  locationUpdateResp,
  locationAddResp,
  specAddResp,
  specUpdateResp,
  locationRemoveResp,
  specRemoveResp,
  activeToggleResp,
  ...props
}) => {
  const [updateLocation, setUpdateLocation] = useState(undefined);
  const [removeLocation, setRemoveLocation] = useState(undefined);
  const [isOpenAddLocation, setIsOpenAddLocation] = useState(false);

  const [isOpenUpdateLocation, setIsOpenUpdateLocation] = useState(false);
  const [isOpenRemoveLocation, setIsOpenRemoveLocation] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [updateSpec, setUpdateSpec] = useState(undefined);
  const [removeSpec, setRemoveSpec] = useState(undefined);

  const [isOpenRemoveSpec, setIsOpenRemoveSpec] = useState(false);
  const [isOpenUpdateSpec, setIsOpenUpdateSpec] = useState(false);
  const [isOpenSpecification, setIsOpenSpecification] = useState(false);

  const [activeToggleKey, setActiveToggleKey] = useState(
    `product-toggle-active-${Math.random() * 548741256354}-key`
  );

  const [spcRemoveKey, setSpcRemoveKey] = useState(
    `spec-remove-${Math.random() * 548741256354}-key`
  );

  const [spcUpdateKey, setSpcUpdateKey] = useState(
    `spec-update-${Math.random() * 548741256354}-key`
  );
  const [spcAddKey, setSpcAddKey] = useState(
    `spec-add-${Math.random() * 548741256354}-key`
  );

  const [locationRemoveKey, setLocationRemoveKey] = useState(
    `spec-remove-${Math.random() * 548741256354}-key`
  );

  const [locationUpdateKey, setLocationUpdateKey] = useState(
    `spec-update-${Math.random() * 548741256354}-key`
  );
  const [locationAddKey, setLocationAddKey] = useState(
    `spec-add-${Math.random() * 548741256354}-key`
  );

  useEffect(() => {
    props.thunkProduct(id);
  }, []);

  //Specification Action Start

  const addSpecificationAction = (values) => {
    esFrontLogger.info("onAddSpecificationAction, ", values);
    values.product = id;
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      spcAddKey,
      "Product Specification, Add request sending"
    );
    props.thunkAddSpecification(values);
  };

  const upateSpecificationAction = (uSpec) => {
    uSpec._id = updateSpec?._id;
    esFrontLogger.info("onUpateSpecificationAction, ", uSpec);

    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      spcUpdateKey,
      "Product Specification, Upadet request sending"
    );

    props.thunkUpdateSpecification(uSpec);
  };

  const onUpdateSpecification = (specification) => {
    esFrontLogger.info("onUpdateSpecification, ", specification);
    setUpdateSpec(specification);
    setIsOpenUpdateSpec(true);
  };

  const upateSpecificationFailed = (uSpecFailed) => {
    esFrontLogger.info("onUpateSpecificationFailed, ", uSpecFailed);
  };

  const addSpecificationFailed = (specFailed) => {
    esFrontLogger.info("onAddSpecificationFailed, ", specFailed);
  };

  const onSpecificationRemove = (specification) => {
    if (!isOpenRemoveSpec) {
      setIsOpenRemoveSpec(true);
      setRemoveSpec(specification);
    } else {
      setIsOpenRemoveSpec(false);
      setRemoveSpec(undefined);
    }
  };

  const removeSpecificationAction = (status) => {
    console.log("removeSpecificationAction, ", removeSpec);
    setIsSubmit(true);
    props.thunkRemoveSpecification(removeSpec?._id);
    getUpdatedNotification(
      "info",
      spcRemoveKey,
      "Product Specification, Remove request sending"
    );
  };

  useEffect(() => {
    if (!isEmptyOrNull(specUpdateResp) && isSubmit) {
      if (specUpdateResp.status) {
        getUpdatedNotification("success", spcUpdateKey, specUpdateResp.message);
        props.thunkProduct(id);
        setIsOpenUpdateSpec(false);
      } else {
        getUpdatedNotification("error", spcUpdateKey, specUpdateResp.message);
      }

      setIsSubmit(false);
    }
  }, [specUpdateResp]);

  useEffect(() => {
    if (!isEmptyOrNull(specAddResp) && isSubmit) {
      if (specAddResp.status) {
        getUpdatedNotification("success", spcAddKey, specAddResp.message);
        props.thunkProduct(id);
        setIsOpenSpecification(false);
      } else {
        getUpdatedNotification("error", spcAddKey, specAddResp.message);
      }

      setIsSubmit(false);
    }
  }, [specAddResp]);

  useEffect(() => {
    if (!isEmptyOrNull(specRemoveResp) && isSubmit) {
      if (specRemoveResp.status) {
        getUpdatedNotification("success", spcRemoveKey, specRemoveResp.message);
        props.thunkProduct(id);
        setIsOpenRemoveSpec(false);
      } else {
        getUpdatedNotification("error", spcRemoveKey, specRemoveResp.message);
      }

      setIsSubmit(false);
    }
  }, [specRemoveResp]);

  //Specification Action End

  //Location Action Start

  const addLocationAction = (location) => {
    esFrontLogger.info("onAddLocationAction, ", location);
    location.product = id;
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      locationAddKey,
      "Product Location add request sending..."
    );
    props.thunkAddProductLocation(location);
  };

  const addLocationFailed = (locationFailed) => {
    esFrontLogger.info("onAddLocationFailed, ", locationFailed);
  };

  const onUpdateLocation = (uLocation) => {
    const { details, ...location } = uLocation;
    location.description = details;
    setUpdateLocation(location);
    setIsOpenUpdateLocation(true);
  };

  const updateLocationAction = (uLocation) => {
    uLocation.product = id;
    uLocation.id = updateLocation.id;
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      locationUpdateKey,
      "Product Location Update request sending..."
    );
    props.thunkUpdateProductLocation(uLocation);
  };

  const onLocationRemove = (location) => {
    if (!isOpenRemoveLocation) {
      setIsOpenRemoveLocation(true);
      setRemoveLocation(location);
    } else {
      setIsOpenRemoveLocation(false);
      setRemoveLocation(undefined);
    }
  };

  const locationRemoveAction = (status) => {
    console.log("Remove Location Action ", removeLocation);

    getUpdatedNotification(
      "info",
      locationRemoveKey,
      "Product Location Remove request sending..."
    );
    setIsSubmit(true);
    props.thunkRemoveProductLocation(removeLocation.id);
  };

  const updateLocationFailed = (uLocationFailed) => {
    esFrontLogger.info("onUpdateLocationFailed, ", uLocationFailed);
  };

  useEffect(() => {
    if (!isEmptyOrNull(locationUpdateResp) && isSubmit) {
      if (locationUpdateResp.status) {
        getUpdatedNotification(
          "success",
          locationUpdateKey,
          locationUpdateResp.message
        );
        props.thunkProduct(id);
        setIsOpenUpdateLocation(false);
      } else {
        getUpdatedNotification(
          "error",
          locationUpdateKey,
          locationUpdateResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [locationUpdateResp]);

  useEffect(() => {
    if (!isEmptyOrNull(locationAddResp) && isSubmit) {
      if (locationAddResp.status) {
        getUpdatedNotification(
          "success",
          locationAddKey,
          locationAddResp.message
        );
        setIsOpenAddLocation(false);
      } else {
        getUpdatedNotification(
          "error",
          locationAddKey,
          locationAddResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [locationAddResp]);

  useEffect(() => {
    if (!isEmptyOrNull(locationRemoveResp) && isSubmit) {
      if (locationRemoveResp.status) {
        getUpdatedNotification(
          "success",
          locationRemoveKey,
          locationRemoveResp.message
        );
        setIsOpenRemoveLocation(false);
        props.thunkProduct(id);
      } else {
        getUpdatedNotification(
          "error",
          locationRemoveKey,
          locationRemoveResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [locationRemoveResp]);

  //Location Action End

  const onProductActoveToggle = () => {
    setIsSubmit(true);
    props.thunkProductToggleActive(id);
    getUpdatedNotification(
      "info",
      activeToggleKey,
      "Product active toggle request sending"
    );
  };

  useEffect(() => {
    if (!isEmptyOrNull(activeToggleResp) && isSubmit) {
      if (activeToggleResp.status) {
        getUpdatedNotification(
          "success",
          activeToggleKey,
          activeToggleResp.message
        );
        props.thunkProduct(id);
      } else {
        getUpdatedNotification(
          "error",
          activeToggleKey,
          activeToggleResp.message
        );
      }
      setIsSubmit(false);
    }
  }, [activeToggleResp]);

  return (
    <React.Fragment>
      <Row>
        <ConfrimModal
          isOpen={isOpenRemoveLocation}
          onConfrim={locationRemoveAction}
          onCancel={onLocationRemove}
          title="You want to remove this Location?"
          content={
            <div className="grid grid-cols-1 gap-2">
              <span>{removeLocation?.city} </span>
              <span>{removeLocation?.details}</span>
            </div>
          }
        />

        <ConfrimModal
          isOpen={isOpenRemoveSpec}
          onConfrim={removeSpecificationAction}
          onCancel={onSpecificationRemove}
          title="You want to remove this spcKey?"
          content={
            <div className="grid grid-cols-1 gap-2">
              <span>{removeSpec?.name}</span>
              <span>{removeSpec?.description}</span>
            </div>
          }
        />
        <EsViewModal
          isOpen={isOpenUpdateSpec}
          handleOk={() => {
            setIsOpenUpdateSpec(false);
          }}
          btnName="Close"
          isClosable={false}
        >
          <ProductSpecificationForm
            title="Update Product Specification"
            name="specification"
            onSubmitAction={upateSpecificationAction}
            onFailedAction={upateSpecificationFailed}
            btnText={"Update"}
            onCancel={() => setIsOpenUpdateSpec(false)}
            specification={updateSpec}
            isUpdate={true}
          />
        </EsViewModal>

        <EsViewModal
          isOpen={isOpenSpecification}
          handleOk={() => {
            setIsOpenSpecification(false);
          }}
          btnName="Close"
          isClosable={false}
        >
          <ProductSpecificationForm
            title="Add Product Specification"
            name="specification"
            onSubmitAction={addSpecificationAction}
            onFailedAction={addSpecificationFailed}
            btnText={"Add"}
            onCancel={() => setIsOpenSpecification(false)}
          />
        </EsViewModal>

        <EsViewModal
          isOpen={isOpenAddLocation}
          handleOk={() => {
            setIsOpenAddLocation(false);
          }}
          btnName="Close"
          isClosable={false}
        >
          <ProductAddress
            title="Add Product Address"
            name="location"
            onSubmitAction={addLocationAction}
            onFailedAction={addLocationFailed}
            btnText={"Add"}
            onCancel={() => {
              setIsOpenAddLocation(false);
            }}
          />
        </EsViewModal>

        <EsViewModal
          isOpen={isOpenUpdateLocation}
          handleOk={() => {
            setIsOpenUpdateLocation(false);
          }}
          btnName="Close"
          isClosable={false}
        >
          <UpdateProductAddress
            title="Update Product Address"
            name="location"
            onSubmitAction={updateLocationAction}
            onFailedAction={updateLocationFailed}
            btnText={"Update"}
            onCancel={() => {
              setIsOpenUpdateLocation(false);
            }}
            location={{
              description: updateLocation?.details,
              ...updateLocation,
            }}
          />
        </EsViewModal>
        <Col span={24}>
          {isEmptyOrNull(product) ? (
            <LoadingContent isActive={true} />
          ) : (
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  title="Product Details"
                  className="shadow-xl"
                  bordered
                  extra={
                    <Space>
                      <span
                        className={` px-4 py-1 font-semibold text-white  ${
                          product?.isActive ? "bg-green-700" : "bg-red-600"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={product?.isActive ? faUnlockKeyhole : faLock}
                        />{" "}
                        {product?.isActive ? "Active" : "In-Active"}
                      </span>
                      <EsButton
                        onClick={onProductActoveToggle}
                        type={!product?.isActive ? "success" : "error"}
                        text={!product?.isActive ? "Active" : "In-Active"}
                        icon={
                          <FontAwesomeIcon
                            icon={!product?.isActive ? faUnlockKeyhole : faLock}
                          />
                        }
                      />
                    </Space>
                  }
                >
                  <div className="grid grid-cols-1 gap-4 font-semibold">
                    <ProductPropertyItem
                      title="Title"
                      description={product?.title}
                      key="product-title"
                    />
                    <ProductPropertyItem
                      title="Alias Name"
                      description={product?.aliasName}
                      key="product-aliasName"
                    />
                    <ProductPropertyItem
                      title="Category"
                      description={product?.category?.name}
                      key="product-category"
                    />
                    <ProductPropertyItem
                      title="description"
                      description={product?.description}
                      key="product-description"
                    />

                    <ProductPropertyItem
                      title="Price"
                      description={
                        <Space>
                          <Space>
                            <span>{product?.price}</span>{" "}
                            <span>{product?.unit?.name}</span>
                          </Space>
                          <Space>
                            <span>Discount:</span>{" "}
                            <span>{product?.flatDiscount}</span>
                          </Space>
                        </Space>
                      }
                      key="product-flatDiscount"
                    />
                    <ProductPropertyItem
                      key="product-commission"
                      title="Commission"
                      description={
                        <div>
                          <span>{product.agentCharge}</span>
                        </div>
                      }
                    />
                    <ProductPropertyItem
                      key="product-clientDiscount"
                      title="Client Discount"
                      description={product?.clientDiscount}
                    />
                    <ProductPropertyItem
                      title="Rating"
                      description={
                        <div className="h-9 ">
                          <Space>
                            <span>{product?.ratingScale}</span>
                            {" | "}
                            <span className="flex flex-row gap-6">
                              <span>Avg. Rating:</span>
                              <Rate
                                className=""
                                allowHalf
                                value={product?.avgRating}
                                disabled
                              />
                            </span>
                          </Space>
                        </div>
                      }
                      key="product-avgRating"
                    />

                    <ProductPropertyItem
                      key={"product-aut-user"}
                      title="User"
                      description={
                        <Space>
                          <span>
                            <FontAwesomeIcon icon={faUserCog} />
                          </span>
                          <span>{product?.user?.name}</span>
                        </Space>
                      }
                    />

                    <ProductPropertyItem
                      title="Availability"
                      description={
                        <Space>
                          <span
                            className={`${
                              product?.isAnywhere
                                ? "bg-green-700"
                                : "bg-teal-600"
                            } px-5 py-2 shadow-lg text-white`}
                          >
                            {product?.isAnywhere
                              ? "Anywhere in BD"
                              : "Specific Location"}
                          </span>

                          <span
                            className={`${
                              !product?.isUpcoming
                                ? "bg-green-700"
                                : "bg-red-600"
                            } px-5 py-2 shadow-lg text-white`}
                          >
                            {product?.isUpcoming ? "Upcoming" : "In House"}
                          </span>
                        </Space>
                      }
                      key="product-price"
                    />

                    <ProductPropertyItem
                      key={"product-dates"}
                      title="Date"
                      description={
                        <Space className="h-9">
                          <Space>
                            <span>Create:</span>
                            <span>
                              <span className="text-teal-700">
                                <FontAwesomeIcon icon={faClock} />{" "}
                              </span>
                              <EsDateFormat date={product?.createdAt} />
                            </span>
                          </Space>
                          {" | "}
                          <Space>
                            <span>Updated:</span>
                            <span>
                              <span className="text-amber-500">
                                <FontAwesomeIcon icon={faClockRotateLeft} />{" "}
                              </span>
                              <EsDateFormat date={product?.updatedAt} />
                            </span>
                          </Space>
                        </Space>
                      }
                    />
                  </div>
                </Card>
              </Col>

              <Col span={24}>
                <Card
                  title="Specifications"
                  className="shadow-xl"
                  bordered
                  extra={
                    <EsButton
                      text="Add"
                      type="success"
                      icon={<FontAwesomeIcon icon={faPlusSquare} />}
                      onClick={() => {
                        setIsOpenSpecification(true);
                      }}
                    />
                  }
                >
                  <Table
                    className=""
                    dataSource={product?.specifications}
                    columns={productSpecificationsCols({
                      onUpdate: onUpdateSpecification,
                      onRemove: onSpecificationRemove,
                    })}
                  />
                </Card>
              </Col>

              <Col span={24}>
                <Card
                  title="Address | Locations"
                  extra={
                    <EsButton
                      text="Add"
                      type="success"
                      icon={<FontAwesomeIcon icon={faPlusSquare} />}
                      onClick={() => {
                        setIsOpenAddLocation(true);
                      }}
                    />
                  }
                >
                  <Table
                    dataSource={product?.locations}
                    columns={productLoactionCols({
                      onUpdate: onUpdateLocation,
                      onRemove: onLocationRemove,
                    })}
                  />
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Organization">
                  <div className="grid grid-cols-1 gap-4 font-semibold capitalize">
                    <ProductPropertyItem
                      title="name"
                      description={product?.organization?.name}
                      key="product-org-name"
                    />

                    <ProductPropertyItem
                      title="phone No"
                      description={product?.organization?.phoneNo}
                      key="product-org-phoneNo"
                      className=""
                    />

                    <ProductPropertyItem
                      title="email"
                      description={product?.organization?.email}
                      key="product-org-email"
                    />

                    <ProductPropertyItem
                      title="Contract"
                      description={product?.organization?.contract}
                      key="product-org-contract"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

AdminProductCard.propTypes = {
  thunkProduct: PropTypes.func.isRequired,
  thunkAddSpecification: PropTypes.func.isRequired,
  thunkUpdateSpecification: PropTypes.func.isRequired,
  thunkRemoveSpecification: PropTypes.func.isRequired,
  thunkAddProductLocation: PropTypes.func.isRequired,
  thunkUpdateProductLocation: PropTypes.func.isRequired,
  thunkRemoveProductLocation: PropTypes.func.isRequired,
  thunkProductToggleActive: PropTypes.func.isRequired,
  product: PropTypes.object,
  specAddResp: PropTypes.object,
  specUpdateResp: PropTypes.object,
  specRemoveResp: PropTypes.object,
  locationAddResp: PropTypes.object,
  locationUpdateResp: PropTypes.object,
  locationRemoveResp: PropTypes.object,
  activeToggleResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    activeToggleResp: state.product.activeToggle,
    locationAddResp: state.product.addLocation,
    locationUpdateResp: state.product.updateLocation,
    locationRemoveResp: state.product.removeLocation,
    specAddResp: state.specification.added,
    specUpdateResp: state.specification.update,
    specRemoveResp: state.specification.remove,
  };
};

const mapDispatchToProps = {
  thunkProduct,
  thunkAddSpecification,
  thunkUpdateSpecification,
  thunkAddProductLocation,
  thunkUpdateProductLocation,
  thunkRemoveSpecification,
  thunkRemoveProductLocation,
  thunkProductToggleActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductCard);
