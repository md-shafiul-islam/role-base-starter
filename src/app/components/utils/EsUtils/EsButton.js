import { Button } from "antd";
import React from "react";

/**
 *
 * @param {string:  success, error, info} type
 * @returns
 */
const EsButton = ({
  text = "",
  type = "",
  icon = "",
  space = "",
  isDisable,
  ...params
}) => {
  if (type === "success") {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#52c41a", color: "#FFF" }}
          className={isDisable ? "cursor-not-allowed" : "cursor-pointer"}
          disabled={isDisable}
          {...params}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "error") {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#ff4d4f", color: "#FFF" }}
          {...params}
          className={isDisable ? "cursor-not-allowed" : "cursor-pointer"}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "info") {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#1890ff", color: "#FFF" }}
          className={isDisable ? "cursor-not-allowed" : "cursor-pointer"}
          disabled={isDisable}
          {...params}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "order") {
    return (
      <React.Fragment>
        <Button
          className={
            isDisable
              ? "!bg-orange-700 cursor-not-allowed text-white"
              : "cursor-pointer !bg-orange-700 text-white"
          }
          disabled={isDisable}
          {...params}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "cart") {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#fa8c16", color: "#FFF" }}
          className={
            isDisable
              ? "bg-orange-500 cursor-not-allowed"
              : "cursor-pointer bg-orange-500"
          }
          disabled={isDisable}
          {...params}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else if (type === "cool") {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#006d75", color: "#FFF" }}
          disabled={isDisable}
          {...params}
          className={isDisable ? "cursor-not-allowed" : "cursor-pointer"}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button
          style={{ background: "#434343", color: "#FFF" }}
          disabled={isDisable}
          {...params}
          className={isDisable ? "cursor-not-allowed" : "cursor-pointer"}
        >
          {text}
          {space}
          {icon}
        </Button>
      </React.Fragment>
    );
  }
};

export default EsButton;
