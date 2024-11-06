import React, { useState } from 'react';
import { Button, Card, Col, Drawer, Row } from 'antd';
import ComponentFiltering from '../component/pcComponent/ComponentFiltering';
import SelectType from '../component/Mobiles/SelectCategory';
import AllProcessor from '../component/pcComponent/Processor/AllProcessor';
import ShortVideo from '../component/CstLayout/videoPlayer/ShortVideo';
import FooterPlacement from '../component/CstLayout/FooterPlacement';


const component = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
        <Row >
        <Col className="mobile-menu-type-component" span={24} >
        <SelectType category="Processor" />
        <SelectType category="Motherboard" />
        <SelectType category="CPU Cooler" />
        <SelectType category="Casing" />
        <SelectType category="Water/Liquid Cooler" />
        <SelectType category="Graphics Card" />
        <SelectType category="Ram (Desktop)" />
        <SelectType category="Ram (Laptop)" />
        <SelectType category="SSD" />
        <SelectType category="HDD" />
        <SelectType category="Power Supply" />
        <SelectType category="Portable SSD" />
        <SelectType category="Portable HDD" />
        <SelectType category="Casing Cooler" />
        <SelectType category="Sound Card" />
        <SelectType category="Optical Hard Disk" />
        <SelectType category="Voltage Stablizer" />
        <SelectType category="Vertical Graphics Card Holder" />
        
        
        </Col>
      </Row>
      <Row justify='space-around'>
          <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:5}} xl={{span:5}} xxl={{span:5}}>
            
            <div className="mobileHidden">
            <ComponentFiltering />
              </div>
              <div className="mobileVisible">
              <Button type="primary" onClick={showDrawer}>
                Filter
              </Button>
               <Drawer width={250} title="Filter" placement="left" onClose={onClose} visible={visible}>
               <ComponentFiltering />

               </Drawer>
              </div>
          </Col>

          <Col  xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:18}} xl={{span:18}} xxl={{span:18}}>
            <AllProcessor />
            
          </Col>

      </Row>
        <Row className="video-player">
            <Col>
              <ShortVideo src="https://www.youtube.com/watch?v=xdOumVBRKp8" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FooterPlacement />
            </Col>
          </Row>
    </>
  )
}

export default component;