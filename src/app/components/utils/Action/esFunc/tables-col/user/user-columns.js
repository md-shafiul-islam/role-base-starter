import { Space } from "antd";
import EsButton from "../../../components/EsUtils/EsButton";
import EsBadge from "../../../components/EsUtils/EsBadge";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import { FileTextOutlined } from "@ant-design/icons";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";

export const userColumns = [
  {
    title: "Name/নাম",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone No",
    dataIndex: "phoneNo",
    key: "phoneNo",
  },
  {
    title: "Address",
    dataIndex: "address1",
    key: "address1",
    render: (v, item) => {
      return `${v} ${item?.address2 ? item?.address2 : ""}`;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Is Enabled",
    dataIndex: "enabled",
    key: "enabled",
    render: (v) => {
      return (
        <Space>
          {v == 1 ? (
            <EsBadge text="Yes" type="success" />
          ) : (
            <EsBadge text="No" type="error" />
          )}{" "}
        </Space>
      );
    },
  },
  {
    title: "Is Lockd",
    dataIndex: "locked",
    key: "locked",
    render: (v) => {
      return (
        <Space>
          {v == 1 ? (
            <EsBadge text="Yes" type="error" />
          ) : (
            <EsBadge text="No" type="success" />
          )}{" "}
        </Space>
      );
    },
  },

  {
    title: "Date/তারিখ",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return <EsDateFormat date={date} format="dd/mm/yyyy" />;
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "action",
    render: (id) => {
      return (
        <>
          <CstButtonActionLink
            icon={<FileTextOutlined />}
            title={`User Detail View`}
            to={`/users/${id}`}
          />
        </>
      );
    },
  },
];
