import { Space } from "antd";
import EsBadge from "../../../components/EsUtils/EsBadge";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";
import { isEmptyOrNull } from "../../gen-es/esCheckFunc";
import { FileTextOutlined } from "@ant-design/icons";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";


export const onTimePaysCols = [
    {
        title: "#",
        dataIndex: "idx",
        key: "idx",
        className: "order-customer-id",
        render: (value, item, idx) => {
            return idx + 1;
        },
    }, {
        title: "Payee",
        dataIndex: "payroll",
        key: "payroll",
        render: (payroll) => {
            if (!isEmptyOrNull(payroll)) {
                return <b>{payroll?.payeeInf}</b>;
            }
            return ``;
        },
    }, {
        title: "description",
        dataIndex: "description",
        key: "description",
        render: (value, item, idx) => {
            return idx + 1;
        },
    }, {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Approve",
        dataIndex: "approve",
        key: "approve",
        render: (approve) => {
            return <>{approve == 2 ? <EsBadge type="error" text="Rejected" /> : approve == 1 ? <EsBadge type="success" text="Approved" /> : <EsBadge type="info" text="Pending" />}</>
        }
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => {
            return <EsDateFormat date={date} />
        }
    },
    {
        title: "Action",
        dataIndex: "id",
        key: "id",
        render: (id) => {
            return (<Space>
                <CstButtonActionLink type="cst"
                    title="Details"
                    to={`/payrolls/employee/ontime/${id}`}
                    name="Details"
                    icon={<FileTextOutlined />} />
            </Space>)
        }
    },

]