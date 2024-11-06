import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const IconItem = ({ isEnabled, ...props }) => {
  return (
    <div className={`${isEnabled ? "text-green-600" : "text-red-500"} text-xl`}>
      <FontAwesomeIcon icon={isEnabled ? faCheckSquare : faXmarkSquare} />
    </div>
  );
};

export default IconItem;
