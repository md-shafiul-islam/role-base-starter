import { Card, Col, Row } from 'antd';
import React from 'react'
import SingleLaptop from './SingleLaptop';

const AllLaptop = () => {
  return (
    <>
    <Row  gutter={[16, 16]}>
         <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:8}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
              <SingleLaptop />
        </Col>
        
       
        
        </Row>

    </>
  )
}

export default AllLaptop;