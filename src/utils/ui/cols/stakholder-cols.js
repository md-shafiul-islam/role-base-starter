import React from "react";
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { readMoreStr } from "@/src/utils/formatter/esConverter";

import CstImage from "@/src/Components/CstView/CstImage";

export const getStakeholderTypeCols = (isAction = false) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
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
              pathUrl={`/administrator/stakeholders/types/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};

export const getStakeholderCols = (isAction = false) => {
  return [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Type",
      dataIndex: "stakeType",
      key: "stakeType",
      render:(type)=>{
        return<span>{type?.title}</span>
      }
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        console.log("Stakeholder, ", item);
        return (
          <React.Fragment>
            <CstBtnActionLink
              title={`Details`}
              wrapperClass="w-auto"
              type="success"
              clazzName="flex flex-row gap-2 px-4 py-1 items-center font-medium"
              pathUrl={`/administrator/stakeholders/${id}`}
              name="Details"
              icon={<FontAwesomeIcon icon={faFileCircleCheck} />}
            />
          </React.Fragment>
        );
      },
    },
  ];
};
