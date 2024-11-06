
import { Card, Checkbox, Image } from 'antd';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';

import React from 'react'

const singleLaptop = (brand, model, price, processor, motherboard, ram, storage, graphics, camera, os, battery, released, adapter, keyboard, webcam, cardReader, wifi, bluetooth, usb, audioJack, hdmi, dimension, weight, color, warranty, touch, ramType, exRamSlot, ...params ) => {
  return (
    <>
       <div className="site-card-border-less-wrapper-laptop">
        <Card title="HP">
          <div className="product-image">
            <Image
            src="https://support.hp.com/doc-images/641/c06965751.png"
            alt='alt'
            height=""
            width=""
            layout="responsive"
             />
          </div>
          <div className="laptop-config-short">
          <Text>Release Date : </Text>
            <Text>Ram : GB</Text>
            <Text>Storage : GB</Text>
            <Text>Camera : Megapixel </Text>
            <Text>Battery :  mah</Text>
            
            <Text><p>Price : Taka only.</p></Text>
        <Checkbox>Add to compare</Checkbox>

            <Link href="/">See more</Link>
          </div>

        </Card>

       </div>

    </>
  )
};

export default singleLaptop;