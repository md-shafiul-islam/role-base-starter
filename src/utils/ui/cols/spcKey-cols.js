import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { readMoreStr } from "@/src/utils/formatter/esConverter";

import CstImage from "@/src/Components/CstView/CstImage";

export const getSpcKeyCols = (isAction = false) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        console.log("Spc Key ", id);
        console.log("Spc Key item, ", item);
        return (
          <React.Fragment>
            <CstBtnActionLink
              title={`Details`}
              wrapperClass="w-auto"
              type="success"
              clazzName="flex flex-row gap-2 px-4 py-1 items-center font-medium"
              pathUrl={`/administrator/specification-keys/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};
