import { Button, Col, Modal, Row, Select } from "antd";
import React from "react";
import EsButton from "../EsButton";

const EsBankAccountDetails = ({
  isOpen = false,
  title,
  handleOk,
  handleCancel,
  account,
  ownerAction,
  isAction = false,
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
        <Button key="cancel" type="primary" onClick={handleOk}>
          Close
        </Button>,
      ]}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row>
            <Col span={8}>Name</Col>
            <Col span={16}>{account?.name}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>Account No.</Col>
            <Col span={2} offset={1}>
              <div
                className="bank-icon"
                style={{
                  backgroundImage: `url(${account?.bankBranch?.bank?.logoUrl})`,
                }}
              ></div>
            </Col>
            <Col span={13}>{account?.accountNo}</Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={8}>Bank Name:</Col>
            <Col span={16}>{account?.bankBranch?.bank?.name}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>Address</Col>
            <Col span={16}>{account?.bankBranch?.address}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>Account Type</Col>
            <Col span={16}>{account?.type?.name}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>Total Debit</Col>
            <Col span={16}>{account?.totalDebit}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>Total Credit</Col>
            <Col span={16}>{account?.totalCredit}</Col>
          </Row>
        </Col>

        {account?.creditBalance > 0 ? (
          <Col span={24}>
            <Row>
              <Col span={8}>Credit Balance</Col>
              <Col span={16}>{account?.creditBalance}</Col>
            </Row>
          </Col>
        ) : (
          ""
        )}

        {account?.debitBalance > 0 ? (
          <Col span={24}>
            <Row>
              <Col span={8}>Bebit Balance</Col>
              <Col span={16}>{account?.debitBalance}</Col>
            </Row>
          </Col>
        ) : (
          ""
        )}

        {isAction ? (
          <Col span={24}>
            <Row>
              <Col span={16}>
                <EsButton
                  text="Add This Account To Owner"
                  type="success"
                  onClick={() => {
                    ownerAction(account);
                  }}
                />
              </Col>
            </Row>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Modal>
  );
};

export default EsBankAccountDetails;
