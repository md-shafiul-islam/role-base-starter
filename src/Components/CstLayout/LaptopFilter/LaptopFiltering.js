import { Card, Col, Collapse, Row } from 'antd';
import React from 'react'
import FilterLaptopByHDD from '../../Laptop/FilterLaptopByHDD';
import FilterLaptopBySpecialFeature from './FilterLaptopBySpecialFeature';
import FilterLaptopBySSD from './FilterLaptopBySSD';
import LaptopFilterByBrand from './LaptopFilterByBrand';
import LaptopFilterByDisplaySize from './LaptopFilterByDisplaySize';
import LaptopFilterByDisplayType from './LaptopFilterByDisplayType';
import LaptopFilterByGnS from './LaptopFilterByGnS';
import LaptopFilterByGraphics from './LaptopFilterByGraphics';
import LaptopFilterByPrice from './LaptopFilterByPrice';
import LaptopFilterByProcessorModel from './LaptopFilterByProcessorModel';
import LaptopFilterByProcessorType from './LaptopFilterByProcessorType';
import LaptopFilterByRam from './LaptopFilterByRam';


const { Panel } = Collapse;

const LaptopFiltering = ( params) => {
  return ( 
    <>
        <Row>
          <Col span={24}> 
              <Card>
              <Collapse defaultActiveKey="">
                <Panel header="Price">
                  <LaptopFilterByPrice />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Brand">
                <LaptopFilterByBrand />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Ram">
                  <LaptopFilterByRam />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Processor Type">
                  <LaptopFilterByProcessorType />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Processor Model">
                  <LaptopFilterByProcessorModel />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Generation/Series">
                  <LaptopFilterByGnS />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Display Size">
                  <LaptopFilterByDisplaySize />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header=" Display Type">
                  <LaptopFilterByDisplayType />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Graphics">
                <LaptopFilterByGraphics />
                </Panel>
              </Collapse>
            </Card>
            <Card>
            <Collapse>
              <Panel header="HDD">
                <FilterLaptopByHDD />
              </Panel>
            </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="SSD">
                <FilterLaptopBySSD />
                </Panel>
              </Collapse>
            </Card>
            <Card>
              <Collapse>
                <Panel header="Special Feature">
                <FilterLaptopBySpecialFeature />
                </Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>
        
    </>
  )
}

export default LaptopFiltering;