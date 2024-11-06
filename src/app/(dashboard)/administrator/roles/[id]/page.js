import React from "react";
import RoleDetailsCard from "@/src/Components/Role/RoleDetailsCard";

const roleIndexPage = ({ params, ...props }) => {
  return (
    <React.Fragment>
      <RoleDetailsCard id={params?.id} />
    </React.Fragment>
  );
};

export default roleIndexPage;
