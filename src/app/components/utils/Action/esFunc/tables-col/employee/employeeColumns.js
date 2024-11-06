import React, { useEffect, useState } from "react";

import { Space } from "antd";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsBadge from "../../../components/EsUtils/EsBadge";
import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const basicEmployeeColumns = [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "ant-table-cell id-5per",
    render: (value, item, idx) => {
      return idx + 1;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Phone No",
    dataIndex: "phoneNo",
    key: "phoneNo",
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Status",
    dataIndex: "approve",
    key: "approve",
    render: (value, item, idx) => {
      return (
        <React.Fragment>
          <Space>
            {value === 0 ? (
              <EsBadge text="Pending" type="info" />
            ) : value === 3 ? (
              <EsBadge text="Reject" type="error" />
            ) : (
              ""
            )}
          </Space>
        </React.Fragment>
      );
    },
  },

  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value, item, idx) => {
      return (
        <React.Fragment>
          <Space>
            <CstButtonActionLink
              name={`Details`}
              title="Details"
              key={`action-details-${item.id}`}
              to={`/employees/${item.id}`}
              icon={<FileTextOutlined />}
            />

            <CstButtonActionLink
              name={`Edit`}
              title="Edit"
              key={`action-edit-${item.id}`}
              to={`/employees/edit/${item.id}`}
              icon={<EditTwoTone />}
            />
            <CstButtonActionLink
              name={``}
              title="Delete"
              key={`action-delete-${item.id}`}
              to={`/employees/delete/${item.id}`}
              icon={<DeleteOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];
