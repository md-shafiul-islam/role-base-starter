import { Affix, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ComparePopoverCard from "./ComparePopoverCard";

export const CstPopOver = (params) => {
  const [togglePopup, setTogglePopup] = useState(false);

  const onShowToggle = () => {
    setTogglePopup(!togglePopup);
  };

  return (
    <React.Fragment>
      <Affix offsetBottom={80} className="compare-affix">
        <React.Fragment>
          <Button
            className="compare-affix-btn"
            icon={<SyncOutlined />}
            onClick={onShowToggle}
          >
            Compare
          </Button>
          {togglePopup && (
            <ComparePopoverCard
              closeAction={(isClose) => {
                setTogglePopup(isClose);
              }}
            />
          )}
        </React.Fragment>
      </Affix>
    </React.Fragment>
  );
};

export default CstPopOver;
