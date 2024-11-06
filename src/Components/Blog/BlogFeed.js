import { Col, Row } from "antd";
import React from "react";
import CstBtnActionLink from "../EsAction/CstBtnActionLink";
import BlogCard from "./BlogCard";

const BlogFeed = ({ posts = [], ...params }) => {
  return (
    <React.Fragment>
      <Row align="center">
        <Col xxl={22} xl={22} lg={22} md={22} sm={24} xs={24}>
          <h1 className="page-title">Articles</h1>
          <Row gutter={[16, 16]}>
            {posts?.map((item, idx) => {
              return (
                <Col span={24} key={`blogs-${idx}`}>
                  <BlogCard blog={item} />
                </Col>
              );
            })}
          </Row>
          <Row align="center" style={{ marginTop: 10, marginBottom: 10 }}>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <CstBtnActionLink
                type="success"
                text="All Articles"
                to={`/blogs`}
                title="Go to All Articles"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BlogFeed;
