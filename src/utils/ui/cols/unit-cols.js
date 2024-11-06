import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { title } from "process";

export const getUnitCols = (isAction = false) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Num",
      dataIndex: "num",
      key: "slug",
    },
    {
      title: "Parent",
      dataIndex: "isSub",
      key: "isSub",
    },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
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
              pathUrl={`/administrator/units/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};
