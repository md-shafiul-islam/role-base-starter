import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { readMoreStr } from "@/src/utils/formatter/esConverter";

import CstImage from "@/src/Components/CstView/CstImage";
import { Space } from "antd";

export const getAddressCols = (isAction = false) => {
  return [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "phoneNo",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Details",
      dataIndex: "description",
      key: "description",
      render: (description, item) => {
        console.log("Description, ", item);
        return (
          <span>
            {readMoreStr(
              description,
              20,
              `/administrator/addresses/${item?.id}`
            )}
          </span>
        );
      },
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (region) => {
        return <>{region?.name}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <React.Fragment>
            <CstBtnActionLink
              title={`Details`}
              wrapperClass="w-auto"
              type="success"
              clazzName="flex flex-row gap-2 px-4 py-1 items-center font-medium"
              pathUrl={`/administrator/addresses/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};

export const getRegionCols = () => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <React.Fragment>
            <Space>
              <span className="py-2 px-4 bg-amber-600">Edit</span>
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};

export const getCityCols = () => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <React.Fragment>
            <Space>
              <span className="py-2 px-4 bg-amber-600">Edit</span>
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
