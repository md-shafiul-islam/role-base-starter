"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import CstImage from "./CstImage";
import CstImagePlane from "./CstImagePlane";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { useSelector } from "react-redux";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import { Arapey } from "next/font/google";

const CardImageGallery = ({ selectedImages, product, ...props }) => {
  const [srcUrl, setSrcUrl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    //esBackLogger.info("Use Effect Images ", selectedImages);
    if (!isEmptyOrNull(selectedImages)) {
      setSrcUrl(selectedImages[product.id]);
    }
  }, [selectedImages]);

  useEffect(() => {
    if (!isEmptyOrNull(product)) {
      if (product.images) {
        setImages(product.images);
        esBackLogger.info("Images ", product.images);
        if (!isEmptyOrNull(product?.images[0])) {
          esBackLogger.info("Product Image ", product?.images[0]);
          setSrcUrl(product?.images[0].location);
        }
      }
    }
  }, [product]);

  const ShowImageOrVideo = ({ url, ...props }) => {
    if (isImage(url)) {
      return <CstImage width={500} height={500} src={url} />;
    } else {
      //esBackLogger.info("this is a video ");

      return (
        <CstImage
          width={500}
          height={500}
          src={"/assets/images/Incomplete 1.png"}
        />
      );
    }
  };

  const isImage = () => {
    return true;
  };

  const onImageOrVideoAction = (url) => {
    setSrcUrl(url);
  };
  return (
    <Row>
      <Col Colspan={24}>
        <div className="p-4 mb-4 bg-white rounded-md drop-shadow">
          <Col span={24}>
            <ShowImageOrVideo url={srcUrl} />
          </Col>
          <Col span={24}>
            <ul className="flex flex-row gap-3 items-center justify-start box-border">
              {images.map((image) => {
                //esBackLogger.info("Galaery Image ", image);
                return (
                  <li
                    className="ring-1 p-1 box-border cursor-pointer"
                    onClick={() => {
                      onImageOrVideoAction(image.location);
                    }}
                  >
                    <CstImagePlane
                      height={50}
                      width={50}
                      src={image.location}
                    />
                  </li>
                );
              })}
            </ul>
          </Col>
        </div>
      </Col>
    </Row>
  );
};

CardImageGallery.propTypes = {
  images: PropTypes.array,
};

const mapStateToProps = (state) => {
  return { selectedImages: state.select.images };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardImageGallery);
