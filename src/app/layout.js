import "./globals.css";
import React from "react";

import { Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import ReduxProvider from "@/src/redux/ReduxProvider";
import { Card, Col, Row } from "antd";
import Link from "next/link";
import IconShortText from "./components/utils/EsUtils/IconShortText";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alt Qart",
  description: "E-Commerce",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="!m-0 !p-0">
        <AntdRegistry>
          <ReduxProvider>
            {children}

            <footer className="box-border !m-0 !p-0 bg-white">
              <div className="container mx-auto">
                <Col span={24}>
                  <Row justify={"center"} gutter={[24, 24]}>
                    <Col span={24}>
                      <Card>
                        <Row gutter={[24, 24]} justify={"center"}>
                          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                            <address className=" text-black">
                              <h2 className="font-medium text-lg border-b border-gray-500 mt-1 mb-3">
                                <i className="fa-solid fa-location-dot"></i>
                                &nbsp;Location
                              </h2>
                              <p className="text-sm">
                                AltQart, Kallyanpur-1207, Dhaka.
                              </p>
                            </address>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                            <div className="w-80">
                              <h2 className="text-lg px border-b border-gray-500  mt-1 mb-3 font-bold">
                                Stay with us
                              </h2>
                              <div>
                                <ul className="flex flex-row gap-6 items-center text-3xl">
                                  <li>
                                    <Link
                                      href={"https://www.facebook.com/altqart"}
                                      target="blank"
                                      className="text-gray-700 hover:text-blue-700"
                                    >
                                      {" "}
                                      <i className=" fa-brands fa-square-facebook"></i>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href={
                                        "https://www.instagram.com/altqart/"
                                      }
                                      target="blank"
                                      className="text-gray-700 hover:text-pink-500"
                                    >
                                      {" "}
                                      <i className="fa-brands fa-square-instagram"></i>{" "}
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      href={
                                        "https://www.youtube.com/channel/UCRNb9A4CFOlaW_fQWShXz4A"
                                      }
                                      target="blank"
                                      className="text-gray-700 hover:text-red-600"
                                    >
                                      {" "}
                                      <i className="fa-brands fa-youtube"></i>{" "}
                                    </Link>
                                  </li>
                                  <Link
                                    href={"https://www.tiktok.com/@altqart"}
                                    target="blank"
                                    className="text-gray-700 hover:text-blue-600"
                                  >
                                    {" "}
                                    <i className="fa-brands fa-tiktok">
                                      {" "}
                                    </i>{" "}
                                  </Link>
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                            <div className="text-sm">
                              <h2 className="text-lg text-black border-b border-gray-500  mt-1 mb-3 font-bold">
                                Contact Us
                              </h2>
                              <ul className="flex flex-col gap-4">
                                <li>
                                  <IconShortText
                                    icon={<i className="fa-solid fa-at"></i>}
                                    text="contact@altqart.com"
                                  />
                                </li>
                                <li>
                                  <IconShortText
                                    icon={<i className="fa-solid fa-phone"></i>}
                                    text="01828990718"
                                  />
                                </li>
                                <li>
                                  <IconShortText
                                    icon={
                                      <i className="fa-brands fa-whatsapp"></i>
                                    }
                                    text="01828990718"
                                  />
                                </li>
                                <li>
                                  <Link
                                    href={"m.me/altqart"}
                                    target="blank"
                                    className="text-left text-gray-600"
                                  >
                                    {" "}
                                    <IconShortText
                                      className="text-gray-950"
                                      icon={
                                        <i className="fab fa-facebook-messenger hover:text-blue-600"></i>
                                      }
                                      text="@altqart"
                                    />{" "}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24} className="bg-white">
                            <div className="text-sm">
                              <IconShortText
                                className="text-center text-lg text-gray-900"
                                icon={
                                  <i className="fa-regular fa-copyright"></i>
                                }
                                text="AltQart"
                              />
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </div>
              <Row>
                <Col span={24}></Col>
              </Row>
            </footer>
          </ReduxProvider>
        </AntdRegistry>
      </body>

      <GoogleTagManager
        gtmId="GTM-MDRZ8L5P"
        auth="tyY_p-z8obw7OCqB2s3Dfw&gtm_preview=env-1&gtm_cookies_win=x"
      />
      <GoogleAnalytics gaId="G-2V7K8CTQXX" />
    </html>
  );
};

export default RootLayout;
