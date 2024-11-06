import {
  faCheckSquare,
  faFileCircleCheck,
  faMailBulk,
  faUserCheck,
  faUserLock,
  faUserXmark,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CstActionLink from "@/src/Components/EsAction/CstActionLink";
import { FileDoneOutlined } from "@ant-design/icons";
export const adminUserCols = () => {
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
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },

    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${isVerified ? "text-green-700" : "text-red-500"}`}
            >
              <FontAwesomeIcon icon={isVerified ? faUserCheck : faUserXmark} />
            </span>
          </div>
        );
      },
    },

    {
      title: "Email Verified ",
      dataIndex: "isEmailVerified",
      key: "isEmailVerified",
      render: (isEmailVerified) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${
                isEmailVerified ? "text-green-700" : "text-red-500"
              }`}
            >
              <FontAwesomeIcon
                icon={isEmailVerified ? faCheckSquare : faXmarkSquare}
              />
            </span>
          </div>
        );
      },
    },

    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span className={`${isActive ? "text-green-700" : "text-red-500"}`}>
              <FontAwesomeIcon icon={isActive ? faUserCheck : faUserLock} />
            </span>
          </div>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <span className="">
            <CstActionLink
              className="text-xl text-green-700"
              to={`/administrator/users/${id}`}
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </span>
        );
      },
    },
  ];
};
