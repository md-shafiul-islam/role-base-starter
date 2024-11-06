// @ts-nocheck
import Image from "next/image";
import React from "react";
import placeholder from "@/public/assets/images/placeholder.jpg";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const CstImagePlane = ({
  src = placeholder,
  alt = "Image coming soon",
  width = 300,
  height = 300,
  title,
  ...props
}) => {
  return (
    <React.Fragment>
      <div style={{ position: "relative" }} className="w-full h-fit">
        <Image
          alt={alt}
          title={title}
          width={width}
          height={height}
          src={
            !isEmptyOrNull(src)
              ? `https://image.altqart.com/${src}`
              : placeholder
          }
          // fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CstImagePlane;
