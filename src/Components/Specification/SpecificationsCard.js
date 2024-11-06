import React from "react";
import { Card, Typography } from "antd";

const SpecificationsCard = ({ specs, type, title, ...params }) => {
  return (
    <React.Fragment>
      <Card className="ant-card-body-full-product-details">
        <Typography.Title level={3} className="caption">{title}</Typography.Title>
        <table span={24} className="description-table-data">
          <tbody>
            {specs &&
              specs.map((spec, idx) => {
                if (spec) {
                  if (spec.key && type === spec.key.type) {
                    return (
                      <tr
                        className="description-table"
                        key={`spec-${type}-${idx}`}
                      >
                        <td className="description-table-title-data">
                          {spec.key.name}
                        </td>
                        <td
                          dangerouslySetInnerHTML={{ __html: spec.value }}
                        ></td>
                      </tr>
                    );
                  }
                }
              })}
          </tbody>
        </table>
      </Card>
    </React.Fragment>
  );
};

export default SpecificationsCard;
