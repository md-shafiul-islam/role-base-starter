import React from "react";

/**
 *
 * @param {string:  success, error, info} type
 * @returns
 */
const EsBadge = ({ text = "", type = "", className, ...params }) => {
  if (type === "success") {
    return (
      <React.Fragment>
        <span
          {...params}
          className={`es-badge ${className}`}
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
          className={`es-badge ${className}`}
          style={{ background: "#ff4d4f", color: "#FFF", cursor: "text" }}
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
          className={`es-badge ${className}`}
          {...params}
          style={{ background: "#1890ff", color: "#FFF", cursor: "text" }}
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
          className={`es-badge ${className}`}
          style={{ background: "#434343", color: "#FFF", cursor: "text" }}
        >
          {text}
        </span>
      </React.Fragment>
    );
  }
};

export default EsBadge;
