"use client";
// import { Image } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//responsive
const CstImage = ({
  to = "",
  width = 400,
  height = 350,
  title = "",
  altTag = "",
  layout = "responsive",
  isPreview = false,
  className = "",
}) => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder.jpg");

  useEffect(() => {
    try {
      const url = new URL(to);
      setImageUrl(to);
    } catch (error) {
      console.log("Image URL ", error.message);
    }
  }, [to]);

  return (
    <React.Fragment>
      {/* {to && (
        <div className={`cst-img-con ${className}`}>
          <Image
            src={to}
            alt={altTag}
            title={title}
            preview={isPreview}
            width={width}
            height={height}
            className={className}
          />
        </div>
      )} */}
      {to && (
        <Image
          src={imageUrl}
          alt={altTag}
          width={width}
          height={height}
          title={title}
          layout={layout}
        />
      )}
    </React.Fragment>
  );
};

export default CstImage;
