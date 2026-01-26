// Code: Component for adding new chess opening
import React, { useState } from "react";
import AddChessOpeningLayout from "@/features/OpeningMovesPractice/Layout/Component/SideMenuOpening/AddChessOpeningLayout";

const AddChessOpening = ({}) => {
  const handleAddChessOpening = (): void => {
    // TODO: display popup or something
  };

  return (
    <AddChessOpeningLayout handleAddChessOpening={handleAddChessOpening} />
  );
};

export default AddChessOpening;
