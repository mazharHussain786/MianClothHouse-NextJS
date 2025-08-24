import AddClothComponent from "@/app/components/AddClothComponent";
import ProtectedRoute from "@/app/components/ProctectedComponent";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute role={"admin"}>
      <AddClothComponent />
    </ProtectedRoute>
  );
};

export default page;
