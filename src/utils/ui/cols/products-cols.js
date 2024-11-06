import {
  faCheckSquare,
  faFileCircleCheck,
  faMailBulk,
  faPenToSquare,
  faTrashAlt,
  faUserCheck,
  faUserLock,
  faUserXmark,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CstActionLink from "@/src/Components/EsAction/CstActionLink";
import { FileDoneOutlined } from "@ant-design/icons";
import CstImage from "@/src/Components/CstView/CstImage";
import { title } from "process";
import EsButton from "@/src/Components/EsUtils/EsButton";
import { Space } from "antd";

export const getProductAdminCols = () => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <span>{category.name}</span>;
      },
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <CstImage />
          </div>
        );
      },
    },

    {
      title: "Upcoming: ",
      dataIndex: "isUpcoming:",
      key: "isUpcoming:",
      render: (isUpcoming) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${isUpcoming ? "text-green-700" : "text-red-500"}`}
            >
              <FontAwesomeIcon
                icon={isUpcoming ? faCheckSquare : faXmarkSquare}
              />
            </span>
          </div>
        );
      },
    },

    {
      title: "Publish",
      dataIndex: "isPublish",
      key: "isPublish",
      render: (isPublish) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${isPublish ? "text-green-700" : "text-red-500"}`}
            >
              <FontAwesomeIcon icon={isPublish ? faUserCheck : faUserLock} />
            </span>
          </div>
        );
      },
    },

    {
      title: "Publish",
      dataIndex: "isPublish",
      key: "isPublish",
      render: (isPublish) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${isPublish ? "text-green-700" : "text-red-500"}`}
            >
              <FontAwesomeIcon icon={isPublish ? faUserCheck : faUserLock} />
            </span>
          </div>
        );
      },
    },

    {
      title: "Available",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable) => {
        return (
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <span
              className={`${isAvailable ? "text-green-700" : "text-red-500"}`}
            >
              <FontAwesomeIcon
                icon={isAvailable ? faCheckSquare : faXmarkSquare}
              />
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
          <span className="flex flex-row gap-4">
            <CstActionLink
              className="text-xl text-green-700"
              to={`/administrator/products/${id}`}
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </span>
        );
      },
    },
  ];
};

export const productSpecificationsCols = ({ onUpdate, onRemove, ...props }) => {
  return [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Title",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <Space>
            <EsButton
              type="info"
              text="Edit"
              icon={<FontAwesomeIcon icon={faPenToSquare} />}
              onClick={() => {
                onUpdate(item);
              }}
            />
            <EsButton
              type="error"
              text="Remove"
              icon={<FontAwesomeIcon icon={faTrashAlt} />}
              onClick={() => {
                onRemove(item);
              }}
            />
          </Space>
        );
      },
    },
  ];
};

export const productLoactionCols = ({ onUpdate, onRemove, ...props }) => {
  return [
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Region",
      dataIndex: "regionName",
      key: "regionName",
    },
    {
      title: "Name/Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <Space>
            <EsButton
              type="info"
              text="Edit"
              icon={<FontAwesomeIcon icon={faPenToSquare} />}
              onClick={() => {
                onUpdate(item);
              }}
            />

            <EsButton
              type="error"
              text="Remove"
              icon={<FontAwesomeIcon icon={faTrashAlt} />}
              onClick={() => {
                onRemove(item);
              }}
            />
          </Space>
        );
      },
    },
  ];
};
