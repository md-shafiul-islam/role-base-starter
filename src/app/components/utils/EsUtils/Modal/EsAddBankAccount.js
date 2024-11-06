import { Button, Form, Input, Modal, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";
import React from "react";

const { Option } = Select;

const EsAddBankAccount = ({
    isOpen = false,
    title,
    handleOk,
    handleCancel,
    branches = [],
    initValues = {},
    accountTypes = [],
    onSubmitAction,
    initForm,
    ...params
}) => {

    return (
        <Modal
            maskClosable={false}
            open={isOpen}
            title={title}
            onCancel={handleCancel}
            closable={false}
            footer={[
                <Button key="cancel" type="primary" onClick={handleCancel} danger>
                    Cancel
                </Button>
            ]}
        >
            <Form
                form={initForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                size={"middle"}
                onFinish={onSubmitAction}
                initialValues={initValues}
                name={params?.name ? params?.name : ""}
            >
                <React.Fragment>
                    <Form.Item name={`name`} label={`Ac.Name`}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={`accountNo`} label={`Account No.`}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={`accountType`} label={`Account Type.`}>
                        <Select placeholder="Select Account Type ...">
                            {accountTypes?.map((type) => {
                                return <Option value={type?.id}>{type?.name}</Option>;
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item name={`branch`} label={`Branch.`}>
                        <Select placeholder="Select branch ...">
                            {branches?.map((branch) => {
                                return <Option value={branch?.id}>{branch?.name}</Option>;
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item name={`note`} label="Note">
                        <TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Space>
                    </Form.Item>
                </React.Fragment>
            </Form>
        </Modal>
    );
};

export default EsAddBankAccount;
