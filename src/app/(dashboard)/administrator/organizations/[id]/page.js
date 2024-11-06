import React from "react";
import OrganizationDetailsCard from "@/src/Components/Organization/OrganizationDetailsCard";

const organizationIndexPage = ({ params, ...props }) => {
  return (
    <React.Fragment>
      <OrganizationDetailsCard id={params?.id} />
    </React.Fragment>
  );
};

export default organizationIndexPage;
