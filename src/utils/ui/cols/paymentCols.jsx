import { getStrMonthYearDate } from "../helper";

export const paymentCols = [
  {
    title: "Employee",
    dataIndex: "userEmail",
    key: "userEmail",
  },
  {
    title: "Month",
    dataIndex: "createIn",
    key: "createIn",
    render: (createIn) => {
      return <span>{getStrMonthYearDate(createIn)}</span>;
    },
  },
  {
    title: "Method Type",
    dataIndex: "methodType",
    key: "methodType",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  
  {
    title: "Transaction Id",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Transaction Id",
    dataIndex: "status",
    key: "status",
  },
];
