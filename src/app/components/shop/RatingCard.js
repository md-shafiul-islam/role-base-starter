"use client";
import React, { useEffect, useState } from 'react'
import { Rate } from 'antd'


const RatingCard = ({rating=4.8, count=5, ...props}) =>{


  return (
    <React.Fragment>
         <Rate className='!text-orange-600' disabled allowHalf count={count} value={rating} />
    </React.Fragment>
  )
}

export default RatingCard