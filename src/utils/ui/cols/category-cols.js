import React from "react"
import CstBtnActionLink from "@/src/Components/EsAction/CstBtnActionLink"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Space } from "antd"



export const getCategoryCols = (isAction = false) => {

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
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
        },
        {
            title: "Is Sub",
            dataIndex: "isSub",
            key: "isSub",
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (id, item) => {
                return (
                    <React.Fragment>
                        <CstBtnActionLink title={`Details`}
                            wrapperClass="w-auto"
                            type="success"
                            clazzName="flex flex-row gap-2 px-4 py-1 items-center font-medium"
                            pathUrl={`/administrator/categories/${id}`}
                            name="Details"
                            icon={<FontAwesomeIcon icon={faFileCircleCheck} />}

                        />
                    </React.Fragment>
                )
            }
        },
    ]
}