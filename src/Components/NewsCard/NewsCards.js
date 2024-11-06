import React from "react";
import { Card, Col, Image, Row } from "antd";
import NewsCard from "./NewsCard";



const NewsCards = ({newsItems=[],  ...params}) => {
  return (
    <>
      {newsItems&&newsItems.map((news,idx)=>{
        return (
          <React.Fragment key={`news-${idx}`}>
          <NewsCard news={news} />
        </React.Fragment>
        )
      })}
    </>
  );
};

export default NewsCards;
