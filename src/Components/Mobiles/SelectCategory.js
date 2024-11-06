import { Button } from 'antd'
import Text from 'antd/lib/typography/Text';
import React from 'react'

const SelectCategory = ({category}, ...params) => {
  return (
    <Button type="primary" shape="round" size="middle" className="mobile-menu-type-button">
       
           <h4>{category}</h4>
        
    </Button>
  )
}

export default SelectCategory;