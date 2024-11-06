import { getStrDate } from "../helper";

export const workSheetColumns = () => {
  return [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return getStrDate(date);
      },
    },
  ];
};

export const workSheetStatusColumns = (onMarkItem) => {
  return [
    {
      title: "Employee",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return getStrDate(date);
      },
    },
    {
      title: "Status",
      dataIndex: "cheked",
      key: "cheked",
      render: (status, item) => {
        esBackLogger.info("Wroksheet ", status, ", ", item);
        return status ? (
          <div className="text-center text-gray-200 font-bold flex flex-row gap-4">
            <span className="px-2 py-1 bg-green-600 ">Cheked</span>
          </div>
        ) : (
          <div className="text-center text-gray-200 font-bold flex flex-row gap-4">
            <span className="px-2 py-1 bg-red-500 ">Pending</span>
            <span
              className="px-2 py-1 bg-teal-700 cursor-pointer"
              onClick={() => {
                onMarkItem(item);
              }}
            >
              Mark It{" "}
            </span>
          </div>
        );
      },
    },
  ];
};
