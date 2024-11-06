import React from "react";

const HeaderSerch = ({ text = "", ...porps }) => {
  return (
    <React.Fragment>
      <div className="flex flex-row justify-start items-center ">
        <input
          type="text"
          placeholder={text}
          className="focus:outline-none hover:border-none px-2 h-9 w-3/4 "
        />
        <button className=" h-9 px-3 w-14 bg-orange-400 focus:outline-1 outline-orange-200 hover:border-none text-white">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default HeaderSerch;
