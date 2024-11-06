import React from "react";
import AdminProductCard from "@/src/Components/Product/AdminProductCard";

const adminProductIndexPage = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <AdminProductCard id={params?.id} />
    </React.Fragment>
  );
};

export default adminProductIndexPage;
