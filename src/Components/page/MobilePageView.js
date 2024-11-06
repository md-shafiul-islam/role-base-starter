import {
  Card,
  Carousel,
  Checkbox,
  Col,
  Descriptions,
  Progress,
  Row,
} from "antd";
import React from "react";
import FooterPlacement from "../component/CstLayout/FooterPlacement";
import ShortVideo from "../component/CstLayout/videoPlayer/ShortVideo";
import CstImage from "../component/CstView/CstImage";
import RecommendCard from "../component/Recommended/RecommendCard";
import Link from "next/dist/client/link";
import BackToTop from "../component/CstLayout/BackToTop";
import Head from "next/head";

import CommentPlacement from "../component/Comment/CommentPlacement";

const MobilePageView = (
  title,
  os,
  display,
  ram,
  processor,
  battery,
  ...params
) => {
  return (
    <>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>
            Xiaomi Redmi Note 10 5G Price in Bangladesh, Specifications and
            Reviews
          </title>
          <meta
            name="description"
            content="Price	19000 Taka
                  Storage	64/128 GB
                  Ram	4/6 GB
                  Brand	19000 Taka
                  Category	Smartphone
                  Release in	9th Aug, 2021
                  OS	Android 11, MIUI 13
                  Display	6.43 inch, 1080x2400 pixels
                  Camera	50 MP 2160p
                  Processor	Snapdragon 680 4G
                  Battery	5000 mAh Li-Po"
          />
          <meta
            property="og:title"
            content="Xiaomi Redmi Note 10 5G Price in Bangladesh, Specifications and Reviews"
          />
        </Head>
      </div>
      <Row>
        <Row>
          <Col span={24}>
            <h1 style={{ fontSize: 30 }}>
              {" "}
              Xiaomi Redmi Note 10 5G Price in Bangladesh, Specifications and
              Reviews
            </h1>
          </Col>
        </Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 14, offset: 1 }}
          xl={{ span: 14, offset: 1 }}
          xxl={{ span: 14, offset: 1 }}
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
            >
              <Carousel autoplay={true} dotPosition="bottom">
                <Row>
                  <Col span={24}>
                    <CstImage
                      to="https://drive.google.com/uc?export=view&id=1ApOnHrP95nj8qabLLT-ZJ8hlsiok-R8S"
                      alt="Pixel"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CstImage
                      to="https://drive.google.com/uc?export=view&id=1ApOnHrP95nj8qabLLT-ZJ8hlsiok-R8S"
                      alt="Pixel"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CstImage
                      to="https://drive.google.com/uc?export=view&id=1ApOnHrP95nj8qabLLT-ZJ8hlsiok-R8S"
                      alt="Pixel"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CstImage
                      to="https://drive.google.com/uc?export=view&id=1ApOnHrP95nj8qabLLT-ZJ8hlsiok-R8S"
                      alt="Pixel"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CstImage
                        to="https://drive.google.com/uc?export=view&id=1ApOnHrP95nj8qabLLT-ZJ8hlsiok-R8S"
                        alt="Pixel"
                      />
                    </Card>
                  </Col>
                </Row>
              </Carousel>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
            >
              <div className="product-details-card">
                <h2>Key Features</h2>
                <table className="overview-specification-table">
                  <tbody>
                    <tr>
                      <td className="overview-title-data">Price </td>
                      <td>19000 Taka</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Unofficial Price</td>
                      <td>19000 Taka</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Storage </td>
                      <td>64/128 GB</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Ram </td>
                      <td>4/6 GB</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Brand </td>
                      <td>19000 Taka</td>
                    </tr>

                    <tr>
                      <td className="overview-title-data">Release in </td>
                      <td>9th Aug, 2021</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">OS </td>
                      <td>Android 11, MIUI 13</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Display </td>
                      <td>6.43 inch, 1080x2400 pixels</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Camera </td>
                      <td>50 MP 2160p</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Processor </td>
                      <td>Snapdragon 680 4G</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Battery </td>
                      <td>5000 mAh Li-Po</td>
                    </tr>
                    <tr>
                      <td className="overview-title-data">Category </td>
                      <td>Smartphone</td>
                    </tr>
                  </tbody>
                </table>

                <Checkbox> Add to compare</Checkbox>
              </div>
            </Col>
          </Row>

          <Col span={24}>
            <Card title="Our Rating">
              <Col span={24}>
                <h5>Disclaimer</h5>
                <p style={{ color: "red" }}>
                  All our ratings are depending on your budget and being
                  compared with other phones of same budget. This may vary from
                  user to user.
                </p>
              </Col>
              <Row gutter={[8, 8]}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Performance</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Camera</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Battery</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Connectivity</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Features</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Display</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>Design</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <Card className="ratings-card">
                    <h4>User Experience</h4>
                    <Progress
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                      percent={30}
                      size="small"
                    />
                  </Card>
                </Col>
              </Row>
            </Card>

            <Row>
              <Col span={24}>
                <Card title="Specifications" className="whole-description-card">
                  <Card className="ant-card-body-full-product-details">
                    <caption>Network</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Technology
                          </td>
                          <td>2G, 3g, LTE, 5G</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            2G Bands
                          </td>
                          <td>Lorem ipsum</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            3G Bands lo
                          </td>
                          <td>2G, 3g, LTE, 5G lo</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            4G Bands
                          </td>
                          <td>2G, 3g, LTE, 5G</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            5G Bands
                          </td>
                          <td>2G, 3g, LTE, 5G</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Launch</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Availability
                          </td>
                          <td>Available</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Announced
                          </td>
                          <td>March, 2022</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Body</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Dimensions
                          </td>
                          <td>165.1 x 76.4 x 8.8 mm (6.5 x 3.01 x 0.35 in)</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Weight
                          </td>
                          <td>195 g (6.88 oz)</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Build
                          </td>
                          <td>
                            Glass front (Gorilla Glass 5), plastic frame,
                            plastic back
                          </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">SIM </td>
                          <td>
                            Single SIM (Nano-SIM) or Dual SIM (Nano-SIM, dual
                            stand-by)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>DISPLAY</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Type{" "}
                          </td>
                          <td>TFT</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">Size</td>
                          <td>
                            6.6 inches, 104.9 cm2 (~83.2% screen-to-body ratio)
                          </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Resolution
                          </td>
                          <td>
                            1080 x 2408 pixels, 20:9 ratio (~400 ppi density)
                          </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Protection{" "}
                          </td>
                          <td>Corning Gorilla Glass 5</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Platform</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">OS</td>
                          <td>Android 12, One UI 4.1</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">CPU</td>
                          <td> Octa-core (2.2 GHz & 2.0 GHz)</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Memory</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Card slot
                          </td>
                          <td> microSDXC (dedicated slot)</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Internal{" "}
                          </td>
                          <td>32GB 3GB RAM, 64GB 4GB RAM, 128GB 6GB RAM</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data"></td>
                          <td> eMMC 5.1</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>MAIN CAMERA</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Primary Camera
                          </td>
                          <td>
                            50 MP, f/1.8, (wide), PDAF 5 MP, f/2.2, (ultrawide),
                            1/5 , 1.12µm 2 MP, f/2.4, (macro) 2 MP, f/2.4,
                            (depth)
                          </td>
                        </tr>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Secondary camera
                          </td>
                          <td>8 MP, f/2.0, (wide)</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Features{" "}
                          </td>
                          <td>LED flash, panorama, HDR</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Video
                          </td>
                          <td> 1080p@30fps</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Sound</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Loudspeaker
                          </td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            3.5mm Jack
                          </td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            3G Bands lo
                          </td>
                          <td>2G, 3g, LTE, 5G lo</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            4G Bands
                          </td>
                          <td>2G, 3g, LTE, 5G</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            5G Bands
                          </td>
                          <td>2G, 3g, LTE, 5G</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Connectivity</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">WLAN</td>
                          <td>
                            Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct,
                            hotspot
                          </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Bluetooth
                          </td>
                          <td>5.1, A2DP, LE</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">GPS</td>
                          <td>Yes, with A-GPS, GLONASS, GALILEO, BDS</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data"> NFC</td>
                          <td>N/A</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            FM radio
                          </td>
                          <td>N/A</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data"> USB</td>
                          <td>USB Type-C 2.0</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Infrared port
                          </td>
                          <td>Available</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Communications</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Sensor
                          </td>
                          <td>
                            Fingerprint (side-mounted), accelerometer, gyro,
                            proximity, compass
                          </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Messaging
                          </td>
                          <td>SMS(threaded view), MMS, Email, IM</td>
                        </tr>

                        <tr>
                          <td className="description-table-title-data">
                            Browser
                          </td>
                          <td>HTML5</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">JAVA</td>
                          <td>N/A</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Battery</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Battery type
                          </td>
                          <td>Non-removable Li-Po</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Battery capacity
                          </td>
                          <td>5000 mAh </td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Charging
                          </td>
                          <td>Fast charging 18W</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Card>
                    <caption>Miscellaneous</caption>
                    <table span={24} className="description-table-data">
                      <tbody>
                        <tr className="description-table">
                          <td className="description-table-title-data">
                            Color
                          </td>
                          <td>Black, White, Peach, Blue</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Made in
                          </td>
                          <td>China</td>
                        </tr>
                        <tr>
                          <td className="description-table-title-data">
                            Warranty
                          </td>
                          <td>1 Year service Warranty (Condition Applies)</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                </Card>
                <a href="#">
                  <h2>Xiaomi Redmi Note 10 5G Review</h2>
                </a>
              </Col>
            </Row>
          </Col>
        </Col>
        {/* right side */}

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 7, offset: 1 }}
          xl={{ span: 7, offset: 1 }}
          xxl={{ span: 7, offset: 1 }}
          className="advertise-or-recommendation"
        >
          <Card title="Recommended" className="recommended-like-loved-card">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
            </Row>
          </Card>

          {/* you might also like */}

          <Card
            title="You might also like"
            className="recommended-like-loved-card"
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
            </Row>
          </Card>
          {/* New Arrival */}
          <Card title="New Arrival" className="recommended-like-loved-card">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
            </Row>
          </Card>
          {/* Loved by user */}

          <Card title="Loved by user" className="recommended-like-loved-card">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
              <Col span={8}>
                <RecommendCard
                  price={15000}
                  title="Note 10s"
                  src="https://fdn.gsmarena.com/imgroot/reviews/21/xiaomi-redmi-note-10s/preview/lifestyle/-1200w5/gsmarena_004.jpg"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={14} offset={1}>
          <CommentPlacement />
        </Col>
      </Row>
      <Row className="video-player" justify="center">
        <Col>
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/YZyM94ARGKU"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Link href="/">
            <a style={{ fontSize: 50 }}>Back to Home</a>
          </Link>
        </Col>
      </Row>

      <BackToTop />
    </>
  );
};

export default MobilePageView;
