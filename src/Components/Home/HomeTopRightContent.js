import React from "react";

import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import CstImage from "../CstView/CstImage";

const HomeTopRightContent = (params) => {
  return (
    <>
      <div>
        <Card
          hoverable
          cover={
            <CstImage
              alt="insta"
              to="https://www.instagram.com/p/CIkez4aMycF/?utm_source=ig_web_copy_link"
              width={300}
              height={320}
            />
          }
        >
          <Meta
            title="Beside Atrai River"
            description="https://www.instagram.com/p/CIkez4aMycF/?utm_source=ig_web_copy_link"
          />
        </Card>
        <h1>Advertise here</h1>
      </div>
    </>
  );
};

export default HomeTopRightContent;
