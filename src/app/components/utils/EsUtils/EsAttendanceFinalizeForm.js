import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Space, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React from "react";

const { Option } = Select;
const EsAttendanceFinalizeForm = ({
    initForm,
    submitAction,
    cancelAction,
    placeholder,
    isApprove = false,
    ...params
}) => {
    return (
        <React.Fragment>
            <Col span={24} style={{ marginTop: 10 }}>
                <Card title={params.title}>
                    <Form
                        form={initForm}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        size={"middle"}
                        onFinish={submitAction}
                        name={params.name}
                    >
                        {(values) => {
                            return (
                                <React.Fragment>
                                    <Form.Item name={`status`} label={`বেতন হিসাবের ধরণ`}>
                                        {/**1=Auto Accept, 2 = count without holiday, 3 = Count Subtract Or Bonus  : */}
                                        <Select placeholder="Select One...">
                                            <Option value={1}>Auto Accept</Option>
                                            <Option value={2}>Holiday</Option>
                                            <Option value={3}>Subtract Or Bonus</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name={`holidayCount`} label="ছুটি দিন">
                                        {/** 1 Or 2 */}

                                        <InputNumber placeholder="ছুটির দিন সংখ্যায়" width={400} />
                                    </Form.Item>
                                    <Form.Item name={`holiday`} label="ছুটি দিন/বার">

                                        {/** SUNDAY = 1, MONDAY = 2, TUESDAY = 3, WEDNESDAY = 4, THURSDAY = 5, FRIDAY = 6, SATURDAY = 7 */}

                                        <Select placeholder="দিন নির্বাচন করুণ">
                                            <Option value={6}>FRIDAY/শুক্রুবার</Option>
                                            <Option value={7}>SATURDAY/শনিবার</Option>
                                            <Option value={1}>SUNDAY/রবিবার</Option>
                                            <Option value={2}>MONDAY/সোমবার</Option>
                                            <Option value={3}>TUESDAY/মঙ্গলবার</Option>
                                            <Option value={4}>WEDNESDAY/বুধবার</Option>
                                            <Option value={5}>THURSDAY/বৃহস্পতিবার</Option>

                                        </Select>
                                    </Form.Item>


                                    <Form.Item>
                                        <Space>
                                            <Button type="danger" onClick={cancelAction}>
                                                Cancel
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </React.Fragment>
                            );
                        }}
                    </Form>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default EsAttendanceFinalizeForm;
