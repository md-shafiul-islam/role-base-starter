import React from "react";

/**
 *
 * @param {string:  success, error, info} type
 * @returns
 */
const EsBadge = ({ text = "", type = "", ...params }) => {
  if (type === "success") {
    return (
      <React.Fragment>
        <span
          {...params}
          className="es-badge"
          style={{ background: "#52c41a", color: "#FFF", cursor: "text" }}
        >
          {text}
        </span>
      </React.Fragment>
    );
  } else if (type === "error") {
    return (
      <React.Fragment>
        <span
          className="es-badge"
          style={{ background: "#ff4d4f", color: "#FFF", cursor: "text" }}
          {...params}
        >
          {text}
        </span>
      </React.Fragment>
    );
  } else if (type === "wrr") {
    return (
      <React.Fragment>
        <span
          className="es-badge"
          style={{ background: "#fa8c16", color: "#FFF", cursor: "text" }}
          {...params}
        >
          {text}
        </span>
      </React.Fragment>
    );
  } else if (type === "info") {
    return (
      <React.Fragment>
        <span
          className="es-badge"
          {...params}
          style={{ background: "#1890ff", color: "#FFF", cursor: "text" }}
        >
          {text}
        </span>
      </React.Fragment>
    );
  } else if (type === "cool") {
    return (
      <React.Fragment>
        <span
          className="es-badge"
          {...params}
          style={{ background: "#006d75", color: "#FFF", cursor: "text" }}
        >
          {text}
        </span>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <span
          {...params}
          className="es-badge"
          style={{ background: "#434343", color: "#FFF", cursor: "text" }}
        >
          {text}
        </span>
      </React.Fragment>
    );
  }
};

export default EsBadge;
