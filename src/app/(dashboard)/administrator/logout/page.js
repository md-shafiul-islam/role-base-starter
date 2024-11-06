import Image from "next/image";
import React from "react";
import CstSignOut from "@/src/Components/admin-utils/CstSignOut";
export default function administratorPage() {
  
  return (
    <React.Fragment>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
        <h1>Log Out Here...</h1>
        <CstSignOut /> 
      </main>
    </React.Fragment>
  );
}
