import { Card, Col, Row, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import Head from "next/head";
import React from "react";
import RateItem from "./RateItem";
import RatingCardReadOnly from "./RatingCardReadOnly";

/**
 *
 * @param {ratingItems Array Of Rating Items} param
 * @returns
 */
const SinglePageRatingCard = ({ rating, title, ...params }) => {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="rating"
          content={
            <RatingCardReadOnly
              maxRate={rating?.rateMaxScore}
              minRate={rating?.rateMinScore}
              avgRate={rating?.rateAvrScore}
              title={title}
            />
          }
        ></meta>
      </Head>
      <Card
        title="Our Rating"
        extra={
          <RatingCardReadOnly
            maxRate={rating?.rateMaxScore}
            minRate={rating?.rateMinScore}
            avgRate={rating?.rateAvrScore}
            title={title}
          />
        }
      >
        <Col span={24}>
          <span itemProp="name" style={{ opacity: 0 }}>
            {title}
          </span>
          <Typography>
            <Title level={4}>Disclaimer</Title>
            <Paragraph type="warning" className="single-page-rating">
              All our ratings are depending on your budget and being compared
              with other phones of same budget. This may vary from user to user.
            </Paragraph>
          </Typography>
        </Col>
        <Row gutter={[8, 8]}>
          {rating?.ratingItems?.map((item, idx) => {
            return <RateItem key={`rate-item-${idx}`} item={item} />;
          })}
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default SinglePageRatingCard;
