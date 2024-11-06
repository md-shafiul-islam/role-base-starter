import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Col, Space, Statistic } from "antd";
import { isNumber } from "lodash";

const { Countdown } = Statistic;

const EsCounter = ({ start, end, speed, timeSpeed = 5, ...params }) => {
  const counterElm = useRef(null);

  useEffect(() => {
    updateCounter();
  }, [end]);

  const updateCounter = () => {
    const inc = end / speed;
    if (counterElm) {
      const innerText = counterElm.current.innerText;

      const cCount = Number(innerText);
      if (end > cCount) {
        const nCount = cCount + inc;
        counterElm.current.innerText = Math.round(nCount);
        setTimeout(updateCounter, timeSpeed);
      }
    }
  };

  return (
    <React.Fragment>
      <Card>
        <div ref={counterElm} className="brand-counter">
          {start}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default EsCounter;
