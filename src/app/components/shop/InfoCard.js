import { Card, Col, Row } from "antd";
import React from "react";

const InfoCard = ({ title = "কিভাবে অর্ডার করবেন।", ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title={title} className="font-semibold text-sm px-3" {...props}>
            <p>
              অর্ডার করার জন্য কালার এবং সাইজ সেলেক্ট করে, অ্যাড টু কার্ট করুন
              এবং পরবর্তী ধাপে যান। তারপর -
            </p>
            <br />
            <p>১ঃ নাম-</p>
            <br />
            <p>২ঃ মোবাইল নাম্বার-</p>
            <br />
            <p>
              ৩ঃ ঠিকানা- (ডিস্ট্রিক্ট/সিটি/জেলার নাম লিখুন,পরেরটা’তে
              জেলা/উপজেলার নাম এবং শেষেরটায় আপনার নিজ এলাকার নাম লিখুন। )
            </p>
            <br />
            <p>৪ঃ এবার Add এ ক্লিক করুন। </p>
            <br />
            <p>
              অ্যাড্রেস বার থেকে আপনার ঠিকানাটি আরেকবার দেখে নিন এবং সেলেক্ট
              করুন।
            </p>
            <br />
            <p>
              ৫ঃ এবার Place order এ ক্লিক করলে আপনার অর্ডারটি সম্পন্ন হবে এবং
              আমাদের এন্ড থেকে কল করা হবে।
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InfoCard;
