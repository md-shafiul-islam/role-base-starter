import React from 'react'
import { Card, Checkbox, Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';

const CommonItemCard = ({clockSpeed, cache, core, thread, graphics, display, price, title, src,  ...params}) => {
  
  

  return (
    <>
        
          <Image 
            src={src}
            alt={title}
            layout="responsive"
            height=""
            width={210}
            
          />
            <div className="component-details-card">
            
            <Title style={{fontSize: 20}}>{title} </Title>
            <div className="component-details-card">
            <Text>Clock Speed : {clockSpeed} </Text>
            <Text>Cache : {cache} MB </Text>
            <Text>Core: {core} Core, {thread} thread  </Text>
            <Text>Graphics  : {graphics} GB </Text>
            <Text>Display : {display} </Text>
            <Text><h4>Price : {price}  Taka only.</h4></Text>
        <Checkbox>Add to compare</Checkbox>

            <Link href="/"><a>See more</a></Link>

      </div>
            </div>

        
    </>
  )
}

export default CommonItemCard;