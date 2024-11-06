import { Col, Row } from "antd";
import React from "react";
import BlogCard from "../Blog/BlogCard";

const BlogRow = ({ blogs, ...params }) => {
  return (
    <>
      <Row align="center">
        <Col xxl={16} xl={16} lg={23} md={23} sm={23} xs={23}>
          <h1>Articles</h1>
          <Row gutter={[16, 16]}>
            {blogs?.map((item, idx) => {
              return (
                <Col key={`blogs-${idx}`} xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <BlogCard blog={item} key={`blog-${idx}`} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BlogRow;
