import { Card, Col, Descriptions, Row, Space } from 'antd'
import React from 'react'
import { getCurencyFormat, getDigitToBanglaSongkha, getEsNumber, getNumToString, getSongkhaToDigit } from '../../utils/gen-es/converter'

const EsStockInfoCard = ({ batch, ...params }) => {
    return (
        <React.Fragment>
            <Card title="Batch Info. ব্যাচের তথ্য">
                <Space size={[8, 16]} direction="horizontal">
                    <Descriptions bordered title="Produced Product Info/উৎপাদিত পণ্যর তথ্য">
                        <Descriptions.Item label="Product Unit Cost/পণ্য একক খরচঃ" span={12}>
                            {`${getCurencyFormat(batch?.eachProductCost)} ${batch?.completeUnit?.name}। উপজাত বাদঃ ${getCurencyFormat(batch?.withOutByProductSingleProductCost)} ${batch?.completeUnit?.name}`}
                        </Descriptions.Item>

                        <Descriptions.Item label="মোট পণ্যর পরিমাণ" span={12}>
                            {`${getDigitToBanglaSongkha(getNumToString(batch?.totalProductQty))} ${batch?.completeUnit?.name}`}
                        </Descriptions.Item>

                    </Descriptions>

                    <Descriptions bordered title="By Product/উপজাত পণ্য">
                        {batch?.byProducts?.map((product) => {
                            return (
                                <React.Fragment>
                                    <Descriptions.Item label={`${product?.item?.form?.name} ${product?.item?.name} ${product?.item?.strength?.name}`} span={12}>
                                        <Space size={[16, 20]}>
                                            <span>{`Quantity/পরিমাণঃ ${getDigitToBanglaSongkha(getNumToString(product?.qty))} `}</span>
                                            <span>{`Price/মুল্যঃ ${getDigitToBanglaSongkha(getNumToString(product?.amount))} `}</span>
                                        </Space>
                                    </Descriptions.Item>
                                </React.Fragment>
                            )
                        })}


                    </Descriptions>
                </Space>
            </Card>
        </React.Fragment>
    )
}

export default EsStockInfoCard
