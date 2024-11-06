import { Space } from "antd";
import { NavLink } from "react-router-dom";

export const taskCols = ({ onUpdateAction, onRemoveAction, ...props }) => {
  return [
    {
      title: "Added user",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id, item) => {
        return (
          <Space size="large" className="text-xl">
            <span
              className="cursor-pointer text-teal-700"
              onClick={() => {
                onUpdateAction(item);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => {
                onRemoveAction(item);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </span>
          </Space>
        );
      },
    },
  ];
};
