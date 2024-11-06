import React from "react";
import { Button } from "antd";

/**
 *
 * @param {string:  success, error, info} type
 * @returns
 */
const EsButton = ({ text="", type="", icon="", space=" ", ...params }) => {
  if (type === "success") {
    return (
      <React.Fragment>
        <Button style={{ background: "#52c41a", color: "#FFF" }} {...params}>
          {text} 
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "error") {
    return (
      <React.Fragment>
        <Button style={{ background: "#ff4d4f", color: "#FFF" }} {...params}>
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "info") {
    return (
      <React.Fragment>
        <Button style={{ background: "#1890ff", color: "#FFF" }} {...params}>
          {text} 
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button style={{ background: "#434343", color: "#FFF" }} {...params}>
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  }
};

export default EsButton;
