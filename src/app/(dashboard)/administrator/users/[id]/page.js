import React from "react";
import UserDetailsCard from "@/src/Components/User/UserDetailsCard";

const usersIndexPage = ({ params, ...props }) => {
  return (
    <React.Fragment>
      <UserDetailsCard id={params?.id} />
    </React.Fragment>
  );
};

export default usersIndexPage;
