import { Card, Col, Image, Row } from 'antd'
import React from 'react'

function NewsCard({news: { title, loader, src, height=170, width="", layout="responsive", description}, ...params}) {
  return (
    <Card title={title} className="news-card-container">
        <div className="img-desc">
          <Row align='center'>
            <Col xs={23} sm={23} md={23} lg={8} xl={8} xxl={8}>
            <Row align='center'>
              <Col span={23}>
                <Image
                loader={loader}
                src={src}
                alt={title}
                title={title}
                height={height}
                width={width}
                layout={layout}
              /> 
              </Col>
            </Row>
          
            </Col>
            <Col xs={23} sm={23} md={23} lg={16} xl={16} xxl={16}>
            <p>{description}</p>
            </Col>
          </Row>
        </div>

      </Card>
  )
}

export default NewsCard;