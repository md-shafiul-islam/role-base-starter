import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons/lib/icons";
import { Col, Row } from "antd";
import Link from "next/link";

const FooterPlacement = () => {
  return (
    <Row className="footer-placement-row">
      <Col span={24}>
        <Row className="footer-placement" align="center">
          <Col span={22}>
            <Row justify="space-around">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
              ></Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
                className="each-footer-item"
              >
                <h1 className="footer-placement-item">More</h1>
                <p>
                  <Link
                    href="/about-us"
                    className="footer-placement-item"
                    passHref
                  >
                    <a>About Us</a>
                  </Link>
                </p>
                <p className="footer-placement-item">
                  <Link href="/contact-us" passHref>
                    <a>Contact Us</a>
                  </Link>
                </p>
                <p>
                  <Link
                    href="/privacy-policy"
                    className="footer-placement-item"
                    passHref
                  >
                    <a>Privacy Policy</a>
                  </Link>
                </p>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
              >
                <h1 className="footer-placement-item">
                  Connect with us through
                </h1>
                <div className="our-social-media-sites">
                  <p>
                    <Link
                      href="https://www.facebook.com/gearOTGofficial"
                      target="_blank"
                      className="footer-placement-item"
                      passHref
                    >
                      <a>
                        Facebook <FacebookOutlined alt="facebook" />
                      </a>
                    </Link>
                  </p>

                  <p>
                    <Link
                      href="https://www.youtube.com/channel/UCyqy2b4ziyWTnDqhUruLCLg"
                      target="_blank"
                      className="footer-placement-item"
                      passHref
                    >
                      <a>
                        Youtube <YoutubeOutlined />
                      </a>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://www.instagram.com/"
                      target="_blank"
                      className="footer-placement-item"
                      passHref
                    >
                      <a>
                        Instagram <InstagramOutlined />
                      </a>
                    </Link>
                  </p>

                  <p>
                    <Link
                      href="https://www.pinterest.com/gearotg/"
                      target="_blank"
                      className="footer-placement-item"
                      passHref
                    >
                      <a>Pinterest</a>
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FooterPlacement;
