/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { Col, Row } from 'antd';
import SelectType from '../component/Mobiles/SelectCategory';
import AllLaptop from '../component/Laptop/AllLaptop';
import LaptopFiltering from '../component/CstLayout/LaptopFilter/LaptopFiltering';
import FooterPlacement from '../component/CstLayout/FooterPlacement';
import BackToTop from '../component/CstLayout/BackToTop';
import Head from "next/head";


const laptop = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
       <div>
        <Head>
          <meta charSet="utf-8"/>
          <title>Laptop</title>
          <meta name="description" 
          content="See Specifications of apple, hp, asus, dell, razer, avita, lenovo, msi, samsung, gigabyte, realme, huawei, nexstgo, walton, mi, ilife, acer, chuwi, alienware, fujitsu, honor, geo, getac, gigabyte, google, huawei, lava International, LG, microsoft, panasonic, walton, xiaomi  Laptop"/>
              <meta property="og:title" content="All Laptop"/>
          </Head>

       </div>
        <Row >
        <Col span={24} className="mobile-menu-type">
          <SelectType  
            category="Gaming"
          />
          <SelectType 
            category="Premium"
          />
          <SelectType 
            category="Mid Range"
          />
         
        </Col>
      </Row>
      <Row>
          <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:5}} xl={{span:5}} xxl={{span:5}} >
              <div className="mobileHidden">
              <LaptopFiltering />
              </div>
              <div className="mobileVisible">
              <Button type="primary" onClick={showDrawer}>
                Filter
              </Button>
               <Drawer width={250} title="Filter" placement="left" onClose={onClose} visible={visible}>
                <LaptopFiltering />

               </Drawer>
              </div>
              
          </Col>
          <Col  xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:17}} xl={{span:17}} xxl={{span:17}}>
            <Row>
              <Col >
              <AllLaptop />
              </Col>
          </Row>
        </Col>
      </Row>
      <FooterPlacement />
      <BackToTop />
      
    </>
  )
}

export default laptop;