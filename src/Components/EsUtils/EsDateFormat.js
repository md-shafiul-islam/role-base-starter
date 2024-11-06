import dateFormat from "dateformat";

import React from "react";

const EsDateFormat = ({ date, format, ...props }) => {
  return <React.Fragment>{dateFormat(date, format)}</React.Fragment>;
};

export default EsDateFormat;
