import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography } from "antd";
import CstNextImage from "../Cstview/CstNextImage";
import CstActionLink from "../EsAction/CstActionLink";
import { isEmptyOrNull } from "../../utils/esCheker";
import CstQueryActionLink from "../EsAction/CstQueryActionLink";

const { Title, Paragraph } = Typography;

const BlogCard = ({ blog, ...props }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isEmptyOrNull(blog)) {
      if (Array.isArray(blog.images)) {
        if (blog.images[0]) {
          setImage(blog.images[0]);
        }
      }
    }
  }, [blog, blog?.images]);

  return (
    <React.Fragment>
      <Card className="blog-row-shadow">
        <Row gutter={[10, 20]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <CstNextImage
              title={image?.title}
              alt={image?.altTag}
              src={
                image?.imageUrl
                  ? image?.imageUrl
                  : `/images/pexels-anna-shvets-3683074.jpg`
              }
              height={125}
              width={200}
              layout="responsive"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
            <Typography>
              <Title level={2}>{blog?.title}</Title>
              <Paragraph>{blog?.shortContent}</Paragraph>

              <Paragraph>
                <CstQueryActionLink
                  clazzName="action-link-color"
                  title={`Go to ${blog?.title} Details`}
                  name="Read more..."
                  pathName={`/blogs/[alias]`}
                  query={{ alias: blog?.aliasName }}
                  rIcon={<i className="fa-solid fa-link"></i>}
                />
              </Paragraph>
            </Typography>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default BlogCard;
