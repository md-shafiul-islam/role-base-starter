"use client";
import React, { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import { sendGTMEvent } from "@next/third-parties/google";
import { Col, Row } from "antd";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";
const PageWrapper = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isEmptyOrNull(pathname)) {
      esFrontLogger.info("Page View ", pathname);
      sendGTMEvent({ event: "onPageView", value: pathname });
      sendGTMEvent({ event: "OnLoad", value: pathname });
    }
  }, [pathname]);

  return (
    <React.Fragment>
      <Row>
        <Col
          span={24}
          className="box-border flex flex-col justify-center items-center"
        >
          {children}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PageWrapper;
