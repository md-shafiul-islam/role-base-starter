import { Card, Col, Image, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';

import React from 'react'

const allComponent = (id, title, price, tag, clockSpeed, cache, core, thread, graphics, baseFrequency, defaultTDP, maximumSize, maximumSpeed, memoryType, maxChannels, processorGraphics, baseFrequencyG, maxDynamicFrequency, warranty,  ...params) =>{
  return (
    
        <Card>
          <Image 
            src="https://5.imimg.com/data5/CM/LY/SQ/SELLER-12188422/intel-core-i7-processor-500x500-500x500.jpg"
            alt="Processor"
            layout="responsive"
            height={210}
          />
            <div className="component-details-card">
            <Title style={{fontSize: 20}}>Processor title {" "}</Title>
            <Text>Clock Speed : </Text>
            <Text>Cache :  </Text>
            <Text>{""} Core, {""} thread  </Text>
            <Text>Graphics {""} :  mah</Text>
            <Text>Display : </Text>
            <Text><h4>Price : {""}  Taka only.</h4></Text>
            <Link href="/">See more</Link>  
            </div>

        </Card>
      
  )
}

export default allComponent;