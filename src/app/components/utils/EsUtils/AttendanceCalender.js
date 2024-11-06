import React from "react";
import DatePicker from "react-multi-date-picker";

const AttendanceCalender = ({ onAction, value = [], ...params }) => {
  const onChangeAction = (value) => {
    // //esBackLogger.info("Multi Date Picker ", value);
  };
  return (
    <React.Fragment>
      <DatePicker value={value} onChange={onChangeAction} />
    </React.Fragment>
  );
};

export default AttendanceCalender;
