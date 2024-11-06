import { Card, Col, Collapse, Row } from 'antd';
import React from 'react'

import SelectCategory from '../Mobiles/SelectCategory';
import FilterCameraByBrand from './CameraFilter/FilterCameraByBrand';
import FilterCameraByPrice from './CameraFilter/FilterCameraByPrice';



const { Panel } = Collapse;

const brandCollapseOnChange = (value) => {
  };

const FilterCamera = () => {
  return (
    <>
        <Row>
            <Col span={22} offset={1}>
                <SelectCategory category="Action Camera"/>
                <SelectCategory category="DSLR"/>
                <SelectCategory category="Handy Cam"/>
                <SelectCategory category="Video Camera"/>
                <SelectCategory category="Camera Accessories"/>
            </Col>
        </Row>
        
        <Row>
            <Col span={5}>
            <Card>
                <Collapse defaultActiveKey={[""]} onChange={brandCollapseOnChange}>
                    <Panel header="Price Range " key="1" > <FilterCameraByPrice /></Panel>
                </Collapse>
                </Card>

                

                <Card>
                <Collapse defaultActiveKey={[""]} onChange={brandCollapseOnChange}>
                    <Panel header="Brands" key="1" > <FilterCameraByBrand /></Panel>
                </Collapse>
                </Card>

            </Col>
        </Row>
        
    </>
  )
}

export default FilterCamera;