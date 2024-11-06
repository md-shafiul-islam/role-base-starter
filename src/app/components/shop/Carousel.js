"use client";

import React from "react";
import { Carousel } from "antd";
import CstImage from "./CstImage";

const CstCarousel = () => (
  <Carousel autoplay>
    <div className="w-full xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[200px] lg:h-[350px] h-[400px] xl:h-[400px]">
      <CstImage
        src={`/carousel1.png`}
        isFill={true}
        contHeight="xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[310px] lg:h-[350px] h-[400px] xl:h-[400px]"
      />
    </div>
    <div className="w-full xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[310px] lg:h-[350px] h-[400px] xl:h-[400px]">
      <CstImage
        src={`/carousel2.png`}
        isFill={true}
        contHeight="xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[310px] lg:h-[350px] h-[400px] xl:h-[400px]"
      />
    </div>
    <div className="w-full xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[310px] lg:h-[350px] h-[400px] xl:h-[400px]">
      <CstImage
        src={`/carousel3.jpg`}
        isFill={true}
        contHeight="xxs:h-[150px] xs:h-[150px] sm:h-[150px] md:h-[310px] lg:h-[350px] h-[400px] xl:h-[400px]"
      />
    </div>
  </Carousel>
);

export default CstCarousel;
