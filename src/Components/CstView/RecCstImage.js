// import { Image } from "antd";
import React from "react";
import Image from "next/image";

//responsive
const RecCstImage = ({
  src = "",
  title = "",
  altTag = "",
  layout = "responsive",
  width = 450,
  height = 400,
  isPreview = false,
  className,
  ...props
}) => {
  return (
    <React.Fragment>
      {/* {src && (
        <div className={`cst-img-con ${className}`}>
          <Image
            src={src}
            alt={altTag}
            title={title}
            width="auto"
            height={height}
            preview={isPreview}
          />
        </div>
      )} */}
      {src && (
        <Image
          src={src}
          alt={altTag}
          layout={layout}
          width={width}
          height={height}
        />
      )}
    </React.Fragment>
  );
};

export default RecCstImage;
