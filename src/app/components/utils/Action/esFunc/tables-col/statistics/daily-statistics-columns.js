import React from "react";
import { Space } from "antd";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import { FileTextOutlined } from "@ant-design/icons";
import { getCurrenyFormatSongkha } from "../../gen-es/converter";
import CstBtnActionLink from "../../../components/EsAction/CstBtnActionLink";

export const dailyStatisticsColumns = [
  {
    title: "Date",
    dataIndex: "dateGroup",
    key: "dateGroup",
    fixed: "left",
    width: 100,
    render: (value, item, idx) => {
      return <EsDateFormat date={value} format="dd-mm-yyyy" />;
    },
  },

  {
    title: "Opening Balance",
    dataIndex: "openingBalance",
    key: "openingBalance",
    width: 170,
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "Closeing Balance",
    dataIndex: "closeingBalance",
    key: "closeingBalance",
    width: 170,
    render: (v) => (v > 0 ? getCurrenyFormatSongkha(v) : "----"),
  },
  {
    title: "Stock/মজুদ",
    dataIndex: "stock",
    key: "stock",
    width: 170,
    render: (v) => getCurrenyFormatSongkha(v),
  },

  {
    title: "Asset/সম্পদ",
    dataIndex: "asset",
    key: "asset",
    width: 600,
    children: [
      {
        title: "Daily/দৈনিক",
        dataIndex: "daily",
        key: "daily",
        width: 300,
        children: [
          {
            title: "ক্রেডিট",
            dataIndex: "assetDayCredit",
            key: "assetDayCredit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "ডেবিট",
            dataIndex: "assetDayDebit",
            key: "assetDayDebit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },

      {
        title: "Total/সর্বমোট",
        dataIndex: "total",
        key: "total",
        width: 300,
        children: [
          {
            title: "ক্রেডিট",
            dataIndex: "assetTotalCredit",
            key: "assetTotalCredit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "ডেবিট",
            dataIndex: "assetTotalDebit",
            key: "assetTotalDebit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
    ],
  },

  {
    title: "Cash Account",
    dataIndex: "cash-account",
    key: "cash-account",
    width: 600,
    children: [
      {
        title: "Amount",
        dataIndex: "cash-amount",
        key: "cashAmount",
        width: 300,
        children: [
          {
            title: "Credit",
            dataIndex: "totalCashAcCredit",
            key: "totalCashAcCredit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Debit",
            dataIndex: "totalCashAcDebit",
            key: "totalCashAcDebit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
      {
        title: "Balance",
        dataIndex: "cash-balance",
        key: "cash-balance",
        width: 300,
        children: [
          {
            title: "Credit",
            dataIndex: "totalCashAcCreditBalance",
            key: "totalCashAcCreditBalance",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Debit",
            dataIndex: "totalCashAcDebitBalance",
            key: "totalCashAcDebitBalance",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
    ],
  },

  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
    width: 650,
    children: [
      {
        title: "Revenue",
        dataIndex: "salesRevenue",
        key: "salesRevenue",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },

      {
        title: "Due/Debit",
        dataIndex: "salesDue",
        key: "salesDue",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
      {
        title: "Paid",
        dataIndex: "salesPaid",
        key: "salesPaid",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
      {
        title: "Profit",
        dataIndex: "salesProfit",
        key: "salesProfit",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
      {
        title: "Loss",
        dataIndex: "salesLoss",
        key: "salesLoss",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
    ],
  },

  {
    title: "Purchases",
    dataIndex: "purchasesAmount",
    key: "purchasesAmount",
    width: 500,
    children: [
      {
        title: "Amount",
        dataIndex: "purchasesAmount",
        key: "purchasesAmount",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
      {
        title: "Due/Credit",
        dataIndex: "purchasesDue",
        key: "purchasesDue",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
      {
        title: "Paid",
        dataIndex: "purchasesPaid",
        key: "purchasesPaid",
        width: 150,
        render: (v) => getCurrenyFormatSongkha(v),
      },
    ],
  },
  {
    title: "Expenses",
    dataIndex: "expenses",
    key: "expenses",
    width: 600,
    children: [
      {
        title: "General",
        dataIndex: "general",
        width: 450,
        key: "General",
        children: [
          {
            title: "Amount",
            dataIndex: "expensesAmount",
            key: "expensesAmount",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Due/Credit",
            dataIndex: "expensesDue",
            key: "expensesDue",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Paid",
            dataIndex: "expensesPaid",
            key: "expensesPaid",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
      {
        title: "Production",
        dataIndex: "production",
        key: "production",
        width: 450,
        children: [
          {
            title: "Amount",
            dataIndex: "prodExpensesAmount",
            key: "prodExpensesAmount",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Due/Credit",
            dataIndex: "prodExpensesDue",
            key: "prodExpensesDue",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Paid",
            dataIndex: "prodExpensesPaid",
            key: "prodExpensesPaid",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
    ],
  },

  {
    title: "Daily Cash",
    dataIndex: "dailyCash",
    key: "dailyCash",
    width: 600,
    children: [
      {
        title: "Amount",
        dataIndex: "dailyCashAmount",
        key: "dailyCashAmount",
        children: [
          {
            title: "Credit",
            dataIndex: "dailyCashCredit",
            key: "dailyCashCredit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Debit",
            dataIndex: "dailyCashDebit",
            key: "dailyCashDebit",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
      {
        title: "Balance",
        dataIndex: "dailyCashBalance",
        key: "dailyCashBalance",
        children: [
          {
            title: "Credit",
            dataIndex: "dailyCashCreditBalance",
            key: "dailyCashCreditBalance",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
          {
            title: "Debit",
            dataIndex: "dailyCashDebitBalance",
            key: "dailyCashDebitBalance",
            width: 150,
            render: (v) => getCurrenyFormatSongkha(v),
          },
        ],
      },
    ],
  },

  {
    title: "Stakholder Ac./ব্যাক্তির হিসাব",
    dataIndex: "stakholder",
    key: "stakholderAccount",
    width: 420,
    children: [
      {
        title: "To Day",
        dataIndex: "stakholderToDay",
        key: "stakholderToDay",
        children: [
          {
            title: "Amount",
            dataIndex: "stakholderAmount",
            key: "stakholderDailyAmount",
            children: [
              {
                title: "Credit",
                dataIndex: "dailyTotalEsCredit",
                key: "dailyTotalEsCredit",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
              {
                title: "Debit",
                dataIndex: "dailyTotalEsDebit",
                key: "dailyTotalEsDebit",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
            ],
          },
          {
            title: "Balance",
            dataIndex: "stakholderBalance",
            key: "stakholderDailyBalance",
            children: [
              {
                title: "Credit",
                dataIndex: "dailyTotalEsCreditBalance",
                key: "dailyTotalEsCreditBalance",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
              {
                title: "Debit",
                dataIndex: "dailyTotalEsDebitBalance",
                key: "dailyTotalEsDebitBalance",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
            ],
          },
        ],
      },
      {
        title: "Total",
        dataIndex: "stakholderTotal",
        key: "stakholderTotal",
        children: [
          {
            title: "Amount",
            dataIndex: "stakholderTotalAmount",
            key: "stakholderTotalAmount",
            children: [
              {
                title: "Credit",
                dataIndex: "totalEsCredit",
                key: "totalEsCredit",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
              {
                title: "Debit",
                dataIndex: "totalEsDebit",
                key: "totalEsDebit",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
            ],
          },
          {
            title: "Balance",
            dataIndex: "stakholderTotalBalance",
            key: "stakholderTotalBalance",
            children: [
              {
                title: "Credit",
                dataIndex: "totalEsCreditBalance",
                key: "totalEsCreditBalance",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
              {
                title: "Debit",
                dataIndex: "totalEsDebitBalance",
                key: "totalEsDebitBalance",
                width: 150,
                render: (v) => getCurrenyFormatSongkha(v),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Action",
    dataIndex: "publicId",
    key: "publicId",
    width: 80,
    fixed: "right",
    render: (value) => {
      return (
        <React.Fragment>
          <Space>
            <CstBtnActionLink
              name={``}
              title="বিস্তারিত"
              key={`action-details-statistics-${value}`}
              pathName={`/reports/statistics/[id]`}
              query={{ id: value }}
              icon={<FileTextOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];
