import React from "react";
import SignOrLoginContent from "../../components/Authentication/SignOrLoginContent";

export const signInPage = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <SignOrLoginContent />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default signInPage;
