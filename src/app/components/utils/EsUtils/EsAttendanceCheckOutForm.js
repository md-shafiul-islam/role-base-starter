import { Button, Card, Col, Form, Input, Row, Space, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React from "react";
const format = 'HH:mm a';
const EsAttendanceCheckOutForm = ({
    initForm,
    submitAction,
    cancelAction,
    placeholder,
    isApprove = false,
    ...params
}) => {
    return (
        <React.Fragment>
            <Col span={24} style={{ marginTop: 40 }}>
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
                                    <Form.Item name={`checkOut`} label={params.label}>
                                        <TimePicker use12Hours format="h:mm a" />

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

export default EsAttendanceCheckOutForm;
