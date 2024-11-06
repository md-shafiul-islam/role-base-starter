import React from "react";
import EsButton from "./EsButton";

const AddressSuggestion = ({ areas, onApplySuggestion, ...props }) => {
  return (
    <React.Fragment>
      <ul className="flex flex-row justify-center items-center gap-2">
        {areas &&
          areas.map((area, idx) => {
            return (
              <li className="py-2 flex flex-row items-center text-xl font-semibold">
                <span>{area.name}</span>&nbsp;
                {idx + 1 < areas.length ? (
                  <span className="text-orange-600">
                    <i className="fa-solid fa-angle-right"></i>
                  </span>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        <li className="py-2 flex flex-row items-center text-xl font-semibold">
          <EsButton onClick={onApplySuggestion} text="Apply" />{" "}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default AddressSuggestion;
