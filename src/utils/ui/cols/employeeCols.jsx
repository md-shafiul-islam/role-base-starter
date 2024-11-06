import { FileDoneOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const employeeCols = (onPaidAction) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
    },
    {
      title: "Bank Account",
      dataIndex: "bank_account_no",
      key: "bank_account_no",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => {
        return (
          <span>
            <i className="fa-solid fa-dollar-sign"></i> {salary}
          </span>
        );
      },
    },
    {
      title: "Pay",
      dataIndex: "_id",
      key: "pay",
      render: (id, item) => {
        return (
          <span
            className="cursor-pointer font-semibold text-xl text-green-600 hover:text-green-800"
            onClick={() => onPaidAction(item)}
          >
            <i className="fa-solid fa-money-check-dollar"></i>
          </span>
        );
      },
    },
    {
      title: "Details",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return (
          <span>
            <NavLink
              className="text-xl"
              to={`/administrator/employee-list/details/${id}`}
            >
              <FileDoneOutlined />
            </NavLink>
          </span>
        );
      },
    },
  ];
};

export const employeeAdminCols = (onHROrFireAction) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Make HR",
      dataIndex: "role",
      key: "role",
      render: (role, item) => {
        return (
          <div className="flex flex-row gap-2">
            {item.isHR ? (
              <span>{role}</span>
            ) : (
              <>
                <span className="px-4 py-1 bg-teal-700">{role}</span>
                <span
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-1 font-semibold cursor-pointer"
                  onClick={() => onHROrFireAction(item)}
                >
                  Make HR
                </span>
              </>
            )}
          </div>
        );
      },
    },

    {
      title: "fire",
      dataIndex: "_id",
      key: "_id",
      render: (id, item) => {
        return (
          <div className=" text-white">
            {item.isFired ? (
              <span className="bg-orange-700 px-4 py-1 ">Fired</span>
            ) : (
              <span
                className="font-semibold cursor-pointer bg-red-600 hover:bg-red-800 px-4 py-1"
                onClick={() => onHROrFireAction(item, true)}
              >
                Fired Up{" "}
              </span>
            )}
          </div>
        );
      },
    },

    {
      title: "Details",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return (
          <span>
            <NavLink
              className="text-xl text-green-700 hover:text-green-900"
              to={`/administrator/employee-list/details/${id}`}
            >
              <FileDoneOutlined />
            </NavLink>
          </span>
        );
      },
    },
  ];
};
