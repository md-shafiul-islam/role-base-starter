import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React from "react";

const { Option } = Select;

const EsAttendanceStatus = ({
    initForm,
    submitAction,
    cancelAction,
    placeholder,
    statusOptions = [],

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
                                    <Form.Item name={`status`} label={params.label}>
                                        <Select>
                                            {statusOptions?.map((item, idx) => {
                                                return <Option value={item?.id} key={`status-${idx}`}>{item?.name}</Option>
                                            })}

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

export default EsAttendanceStatus;
