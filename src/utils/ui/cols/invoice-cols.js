import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { readMoreStr } from "@/src/utils/formatter/esConverter";

import CstImage from "@/src/Components/CstView/CstImage";
import { Space } from "antd";

export const getInvoiceCols = () => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor, item) => {
        console.log("vendor, ", vendor);
        return (
          <span>
            {readMoreStr(description, 20, `/administrator/brands/${item?.id}`)}
          </span>
        );
      },
    },
    {
      title: "Client",
      dataIndex: "Client",
      key: "client",
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Client Discount",
      dataIndex: "clientTotalDiscount",
      key: "clientTotalDiscount",
    },
    {
      title: "Agent Charge",
      dataIndex: "agentTotalCharge",
      key: "agentTotalCharge",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Credit",
      dataIndex: "creditAmount",
      key: "creditAmount",
    },
    {
      title: "Status",
      dataIndex: "isApprove",
      key: "isApprove",
      render: (isApprove, item) => {
        return (
          <React.Fragment>
            <Space>
              <div className={`${isApprove ? "bg-green-600" : "bg-red-500"}`}>
                Aprove
              </div>
              <div className={`${isApprove ? "bg-green-600" : "bg-red-500"}`}>
                Accepted
              </div>
            </Space>
          </React.Fragment>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <React.Fragment>
            <CstBtnActionLink
              title={`Details`}
              wrapperClass="w-auto"
              type="success"
              clazzName="flex flex-row gap-2 px-4 py-1 items-center font-medium"
              pathUrl={`/administrator/brands/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};
