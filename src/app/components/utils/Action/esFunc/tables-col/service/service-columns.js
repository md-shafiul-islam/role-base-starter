import CstActionLink from "../../../components/EsAction/CstActionLink";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsBadge from "../../../components/EsUtils/EsBadge";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";
import { FileTextOutlined } from "@ant-design/icons";

export const approveServiceColumn = [
  {
    title: "Invoice ID",
    dataIndex: "invId",
    key: "invId",
  },

  {
    title: "Customer",
    dataIndex: "stakeholder",
    key: "stakeholder",
    render: (stakeholder) => {
      return (
        <CstActionLink
          name={stakeholder?.name}
          title="Customer View details"
          to={`/stakeholders/${stakeholder?.id}`}
        />
      );
    },
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
    title: "Credit/Due",
    dataIndex: "creditAmount",
    key: "creditAmount",
  },

  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return <EsDateFormat date={date} />;
    },
  },
  {
    title: "Status",
    dataIndex: "approve",
    key: "approve",
    render: (approve) => {
      return approve == 0 ? (
        <EsBadge text="Pending" type="info" />
      ) : approve == 1 ? (
        <EsBadge text="Approved" type="cool" />
      ) : approve == 3 ? (
        <EsBadge text="Rejected" type="error" />
      ) : (
        <EsBadge text="Not Set" />
      );
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (id) => {
      return (
        <CstButtonActionLink
          name=""
          icon={<FileTextOutlined />}
          title="View details"
          to={`/services/${id}`}
          type="success"
        />
      );
    },
  },
];

export const serviceItemColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "Service Item Name",
    dataIndex: "item",
    key: "item",
    render: (item) => {
      return <span>{item?.name}</span>;
    },
  },

  {
    title: "পরিমাণ",
    dataIndex: "qty",
    key: "qty",
  },

  {
    title: "মূল্য",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "টাকা পরিমাণ",
    dataIndex: "subTotal",
    key: "subTotal",
  },
];
