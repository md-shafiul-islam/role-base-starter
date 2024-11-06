import { Card } from 'antd';
import React from 'react'
import CommonItemCard from '../CommonItemCard'


const Processor = (params)=>{
return (
    
      <>
      <Card>
      <CommonItemCard 
        id="01880547883"
        Brand="intel"
        tag="processor"
        model="i5 1042"
        gen="10"
        title= "intel core i5 10th gen"
        src="https://5.imimg.com/data5/CM/LY/SQ/SELLER-12188422/intel-core-i7-processor-500x500-500x500.jpg"
        clockSpeed=""
        core="4"
        thread="8"
        graphics="2"
        display="14 inch"
        price="14000"
        cache={6}
        
      />
      

      </Card>
        
      </>
      
      
  )
}

export default Processor;