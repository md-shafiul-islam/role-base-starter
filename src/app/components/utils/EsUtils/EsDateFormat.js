import dateFormat from "dateformat";

import React from "react";

const EsDateFormat = ({ date, format="dd/mm/yyyy", utc=false, ...props }) => {
  return <React.Fragment>{dateFormat(date, format, utc)}</React.Fragment>;
};

export default EsDateFormat;
