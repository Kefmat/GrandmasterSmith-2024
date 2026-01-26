import React, { useEffect, useState } from "react";
import { useOpenings } from "@/providers/OpeningsContext";
import { DropdownWithToggle } from "@/features/Common/Components/DropDown/DropDownWithToggle";

type Option = {
  label: string;
  value: string;
};

// Dummy data for chess openings

export const OpeningDropdown = () => {
  const {
    setCurrentMoveIndex,
    setSelectedOpening,
    openings,
    openingsForDropDown,
  } = useOpenings();
  const handleSelect = (option: Option) => {
    const opening = openings.find((o) => o.name === option.value);
    if (opening) {
      setSelectedOpening(opening);
      setCurrentMoveIndex(0);
    }
  };

  const handleToggle = (checked: boolean) => {
    // Handle the toggle change
  };
  const displayPopover = () => {
    //display a popover
  };
  return (
    <div className="flex flex-col  justify-center">
      <div className="mx-5">
        <DropdownWithToggle
          options={openingsForDropDown}
          onOptionChange={(option: any) => handleSelect(option)}
          onToggleChange={handleToggle}
          toggleLabel="My openings"
          onDelete={() => console.log("Delete")}
        />
      </div>
    </div>
  );
};
