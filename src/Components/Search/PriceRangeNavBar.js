import React from "react";

import CstQueryActionLink from "../EsAction/CstQueryActionLink";
const PriceRangeNavBar = ({ actionUrl, rangeItems = [], ...params }) => {
  return (
    <React.Fragment>
      <ul className="range-list">
        {rangeItems?.map((item) => {
          let qStr = `${item?.start}-${item?.end}`;
          return (
            <li className="range-item" key={`range-${qStr}`}>
              <CstQueryActionLink
                name={qStr}
                title={`${item?.start} To ${item.end}`}
                pathName={`${actionUrl}/range/[query]`}
                query={{ query: qStr }}
                ancClassName="mp-0 "
              />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default PriceRangeNavBar;
