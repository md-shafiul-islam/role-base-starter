import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { readMoreStr } from "@/src/utils/formatter/esConverter";

import CstImage from "@/src/Components/CstView/CstImage";

export const getBrandCols = (isAction = false) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description, item) => {
        console.log("Description, ", item);
        return (
          <span>
            {readMoreStr(description, 20, `/administrator/brands/${item?.id}`)}
          </span>
        );
      },
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Tag Line",
      dataIndex: "tagLine",
      key: "tagLine",
    },
    {
      title: "Logo Url",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (url, item) => {
        return (
          <CstImage
            height={60}
            width={60}
            to={url}
            title={item?.name}
            altTag={item?.name}
          />
        );
      },
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
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
              pathUrl={`/administrator/brands/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};
