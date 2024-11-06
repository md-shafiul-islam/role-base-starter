import React from "react";
import { Col, Row } from "antd";
import DefaultCard from "../CustomLayout/DefaultCard";
import CstBtnActionLink from "../EsAction/CstBtnActionLink";

const NewsFeed = ({ news = [], ...params }) => {
  return (
    <React.Fragment>
      <Row align="center">
        <Col xxl={22} xl={22} lg={22} md={22} sm={24} xs={24}>
          <h1 className="page-title">News</h1>

          <Row gutter={[16, 16]}>
            {news &&
              news.map((item, idx) => {
                return (
                  <Col key={`news-${idx}`} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <DefaultCard news={item} />
                  </Col>
                );
              })}
          </Row>
          <Row align="center" style={{ marginTop: 10, marginBottom: 10 }}>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <CstBtnActionLink
                type="success"
                text="All News"
                to={`/news`}
                title="Go to All news"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NewsFeed;
