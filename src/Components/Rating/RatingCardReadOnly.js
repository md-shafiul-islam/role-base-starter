import { Rate } from "antd";
import React from "react";

const RatingCardReadOnly = ({
  maxRate = 0,
  minRate = 0,
  avgRate = 0,
  title,
  ...props
}) => {
  const getCalculateRate = () => {
    let acNum = maxRate - minRate;
    if (acNum === 5) {
      return avgRate;
    } else {
      let nRatio = avgRate / acNum;
      return 5 * nRatio;
    }
  };
  return (
    <React.Fragment>
      <div
        className="rating-area"
        itemScope
        itemprop="aggregateRating"
        itemType="https://schema.org/AggregateRating"
      >
        <span itemProp="name" style={{ opacity: 0 }}>
          {title}
        </span>
        <span itemProp="itemReviewed" style={{ opacity: 0 }}>
          {title}
        </span>
        <span itemProp="reviewCount" style={{ opacity: 0 }}>
          2
        </span>
        <span>
          <span itemProp="ratingValue">{`${getCalculateRate()}`}</span>/5 |
          <Rate allowHalf disabled defaultValue={getCalculateRate()} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default RatingCardReadOnly;
