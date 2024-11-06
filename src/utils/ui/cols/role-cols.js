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

export const adminRoleCols = () => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span className={`${isActive ? "text-green-700" : "text-red-500"}`}>
              <FontAwesomeIcon
                icon={isActive ? faCheckSquare : faXmarkSquare}
              />
            </span>
          </div>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "publicId",
      key: "publicId",
      render: (id) => {
        return (
          <span className="">
            <CstActionLink
              className="text-xl text-green-700"
              to={`/administrator/roles/${id}`}
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </span>
        );
      },
    },
  ];
};
