// @ts-nocheck
import Image from "next/image";
import React from "react";
import placeholder from "@/public/assets/images/placeholder.jpg";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const CstImage = ({
  src = placeholder,
  alt = "Image coming soon",
  title = "",
  width = 300,
  height = 300,
  isFill = false,
  contHeight = "h-fit",
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        style={{ position: "relative" }}
        className={`w-full ${contHeight} p-3 md:p-1 lg:p-3 sm:p-1 xs:p-0 xxs:p-0`}
      >
        <Image
          alt={alt}
          title={title}
          width={!isFill ? width : ""}
          height={!isFill ? height : ""}
          src={
            !isEmptyOrNull(src)
              ? `https://image.altqart.com/${src}`
              : placeholder
          }
          fill={isFill}
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CstImage;
