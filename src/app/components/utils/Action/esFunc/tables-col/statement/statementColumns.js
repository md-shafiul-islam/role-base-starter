import EsDateFormat from "../../../components/EsUtils/EsDateFormat";
import {
  getCurrenyFormatSongkha,
  getEsDateToBangalSongkha,
} from "../../gen-es/converter";

export const stakeholderStatementColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    fixed: "left",
    width: 100,
    render: (value) => {
      return getEsDateToBangalSongkha(new Date(value));
    },
  },

  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: `Transaction`,
    dataIndex: "transaction",
    key: "transaction",
    children: [
      {
        title: "Credit",
        dataIndex: "credit",
        key: "credit",
        render: (v) => (v > 0 ? getCurrenyFormatSongkha(v) : "--"),
      },
      {
        title: "Debit",
        dataIndex: "debit",
        key: "debit",
        render: (v) => (v > 0 ? getCurrenyFormatSongkha(v) : "--"),
      },
    ],
  },

  {
    title: "Balance",
    key: "Balance",
    children: [
      {
        title: "Credit",
        dataIndex: "creditBalance",
        key: "creditBalance",
        render: (v) => (v > 0 ? getCurrenyFormatSongkha(v) : "--"),
      },
      {
        title: "Debit",
        dataIndex: "debitBalance",
        key: "debitBalance",
        render: (v) => (v > 0 ? getCurrenyFormatSongkha(v) : "--"),
      },
    ],
  },
];
