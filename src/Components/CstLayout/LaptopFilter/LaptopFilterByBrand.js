import { Checkbox, List } from 'antd';
import React, { useState } from 'react'

const brandData =[

    { title: "apple", key: "mac" },
    { title: "hp", key: "hpL" },
    { title: "asus", key: "asusL" },
    { title: "dell", key: "dell" },
    { title: "razer", key: "razer" },
    { title: "avita", key: "avita" },
    { title: "lenovo", key: "lenovo" },
    { title: "msi", key: "msi" },
    {title: "samsung", key: "samsungL"},
    { title: "gigabyte", key: "gigabyte" },
    { title: "realme", key: "realmeL" },
    { title: "huawei", key: "huaweiL" },
    { title: "nexstgo", key: "nexstgo" },
    { title: "walton", key: "walton" },
    { title: "mi", key: "mi" },
    { title: "ilife", key: "ilife" },
    {title: "acer", key: "samsungL"},
    {title: "chuwi", key: "samsungL"},
    {title: "alienware", key: "samsungL"},
    {title: "bmax", key: "samsungL"},
    {title: "BOXX Technologies	", key: "samsungL"},
    {title: "clevo", key: "samsungL"},
    {title: "cyberPowerPC", key: "samsungL"},
    {title: "digital Storm", key: "samsungL"},
    {title: "durabook", key: "samsungL"},
    {title: "dynabook", key: "samsungL"},
    {title: "eluktronics", key: "samsungL"},
    {title: "eurocom", key: "samsungL"},
    {title: "evoo", key: "samsungL"},
    {title: "falcon Northwest", key: "samsungL"},
    {title: "fujitsu", key: "samsungL"},
    {title: "honor", key: "samsungL"},
    {title: "geo", key: "samsungL"},
    {title: "getac", key: "samsungL"},
    {title: "gigabyte", key: "samsungL"},
    {title: "google", key: "samsungL"},
    {title: "huawei", key: "samsungL"},
    {title: "hyundai Technology", key: "samsungL"},
    {title: "illegear", key: "samsungL"},
    {title: "AGB Supreme Technology", key: "samsungL"},
    {title: "lava International", key: "samsungL"},
    {title: "LG", key: "samsungL"},
    {title: "machenike", key: "samsungL"},
    {title: "maguay", key: "samsungL"},
    {title: "medion", key: "samsungL"},
    {title: "metabox", key: "samsungL"},
    {title: "micro-Star International", key: "samsungL"},
    {title: "microsoft", key: "samsungL"},
    {title: "microtech", key: "samsungL"},
    {title: "monster Notebook", key: "samsungL"},
    {title: "NEC", key: "samsungL"},
    {title: "njoy", key: "samsungL"},
    {title: "nokia", key: "samsungL"},
    {title: "obsidian-PC", key: "samsungL"},
    {title: "optima", key: "samsungL"},
    {title: "origin PC", key: "samsungL"},
    {title: "overPowered", key: "samsungL"},
    {title: "panasonic", key: "samsungL"},
    {title: "packard Bell", key: "samsungL"},
    {title: "purism", key: "samsungL"},
    {title: "pazer", key: "samsungL"},
    {title: "realme", key: "samsungL"},
    {title: "sager Notebook computers[", key: "samsungL"},
    {title: "shenzhen Jumper Technology", key: "samsungL"},
    {title: "system76", key: "samsungL"},
    {title: "UMAX", key: "samsungL"},
    {title: "VAIO", key: "samsungL"},
    {title: "vastking", key: "samsungL"},
    {title: "velocity Micro", key: "samsungL"},
    {title: "VIT", key: "samsungL"},
    {title: "walmart", key: "samsungL"},
    {title: "walton", key: "samsungL"},
    {title: "wiaomi", key: "samsungL"},
    {title: "XMG", key: "samsungL"},
    {title: "xolo", key: "samsungL"},
    {title: "zeuslap", key: "samsungL"},
]

const LaptopFilterByBrand = (params) =>{
    const [checkedItems, setCheckedItems] = useState([]);

    const listChangeAction = (value) => {
        const items = [];
    if(checkedItems.includes(value)){
        items= checkedItems.filter((item) => item !== value );
    } else{
        items = [value, ...checkedItems];
    }
    setCheckedItems(items);
    };
    

    const isChecked = (value) => {
        if (checkedItems.includes(value)){
            return true;
        }
        return false;
    }
    

  return (
    <>
        <List
        dataSource={brandData}
        renderItem={(item) => {
            return (
                <>
                    <List.Item>
                        <Checkbox
                         checked={isChecked(item?.key)}
                         onChange={() => {
                                listChangeAction(item?.key);
                        }}
                        >
                        {item?.title}

                        </Checkbox>
                    </List.Item>
                </>
            );
        }}
        />

        
    </>
  );
};

export default LaptopFilterByBrand