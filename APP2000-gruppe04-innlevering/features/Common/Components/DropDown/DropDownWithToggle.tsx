import React, { useEffect, useState } from "react";
import { Select, Switch, SelectItem } from "@nextui-org/react";

import { AddAPhoto, Delete } from "@mui/icons-material";

import mongoose from "mongoose";

import { IChessOpening } from "../../Models/ChessOpening";
import { useOpenings } from "@/providers/OpeningsContext";
import { Option } from "@MyTypes/Options";
import { useGame } from "@/providers/GameContext";
import Swal from "sweetalert2";

type DropdownWithToggleProps = {
  options: Option[];
  defaultValue?: string;
  onOptionChange?: (option: Option) => void;
  onToggleChange: (checked: boolean) => void;
  onDelete: () => void;
  toggleLabel: string;
};

export const DropdownWithToggle = ({
  defaultValue,
  onOptionChange,
  onToggleChange,
  onDelete,
  toggleLabel,
}: DropdownWithToggleProps) => {
  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  const {
    selectedOpening,
    setSelectedOpening,
    openings,
    openingsForDropDown,
    setStatus,
    setCurrentMoveIndex,
  } = useOpenings(); // Use the context to access selectedOpening
  const { game } = useGame();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = openingsForDropDown.find((o) => o.value === e.target.value);
    if (!option?.value) return;
    handleSelect(option);
  };

  // Automatically select the latest added opening when openingsForDropDown updates

  const [selectedOption, setSelectedOption] = useState<
    Set<mongoose.Types.ObjectId> | undefined
  >(undefined);

  useEffect(() => {
    if (openingsForDropDown.length > 0) {
      const val = openingsForDropDown.find(
        (o) => o.value === selectedOpening?._id
      );
      if (!val) return;
      setSelectedOption(new Set([val.value]));
    }
  }, [openingsForDropDown, selectedOpening]);

  const handleSelect = (option: Option) => {
    const opening = openings.find((o) => o.name === option.label);

    if (opening) {
      setSelectedOpening(opening);
      setCurrentMoveIndex(0);
      setStatus("ChoseSidePractice");
    }
  };

  const handleDelete = () => {
    //TODO refactor to delete opening component with button...
    Swal.fire({
      title: "Would you like to delete this opening?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't delete`,
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };

  const handleToggleChange = () => {
    onToggleChange(!toggleChecked);
  };

  return (
    <div className="flex flex-col justify-between dropdown-with-toggle ">
      <div className="flex flex-row  mt-0 p-0 mb-2 pb-4 justify-between align-middle items-center ">
        <div className="flex flex-row justify-center items-center  p-0  gap-2 ">
          <span className="text-secondary py-0 ">{toggleLabel}:</span>
          <Switch
            checked={toggleChecked}
            color="success"
            onChange={() => handleToggleChange}
          />
        </div>
        <div className="right__side flex flex-row justify-center items-center gap-2">
          <div className="flex flex-row justify-center items-center bg-success rounded-full p-2 ">
            <AddAPhoto
              className="z-10 text-secondary"
              onClick={() =>
                alert(
                  "make this button add snapshot of current state of chess board, png image"
                )
              }
            />
          </div>
          <div className="flex flex-row justify-center items-center bg-danger rounded-full p-2 ">
            <Delete className="z-10 text-secondary" onClick={handleDelete} />
          </div>
        </div>
      </div>
      <Select
        placeholder="Select an opening"
        items={openingsForDropDown}
        onChange={(event) => handleSelectionChange(event)}
        label="Select an opening"
        defaultSelectedKeys={selectedOpening?.name?.toString()}
        selectedKeys={selectedOpening?._id?.toString()}
      >
        {openingsForDropDown.map((option, index) => (
          <SelectItem
            key={option.value.toString()}
            value={option.value.toString()}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export const DropdownWithToggleWithoutDeleteAndPhoto = ({
  defaultValue,
  onSelectionChange,
  onToggleChange,
  toggleLabel,
  game,
}: any) => {
  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (openings.length > 0) {
      const val = openings.find(
        (o: IChessOpening) => o?._id?.toString() === e.target.value
      );

      if (!val) return;
      setSelectedOpening(val);
    }
  };
  const {
    selectedOpening,
    setSelectedOpening,
    openings,
    setMyOpenings,
    myOpenings,
    openingsForDropDown,
  } = useOpenings();

  const handleToggleChange = () => {
    console.log("Toggled");
    setMyOpenings(!myOpenings);
  };

  useEffect(() => {
    console.log(openings);
  }, [myOpenings]);

  useEffect(() => {
    console.log("Initial openings:", openingsForDropDown);
  }, [openings]);

  const DropdownOrNone = () => {
    if (!openings || !Array.isArray(openings) || openings.length === 0)
      return <div>No openings...</div>;

    return (
      <Select
        placeholder="Select an opening"
        items={openings}
        onChange={handleSelectionChange}
        label="Select an opening"
        defaultSelectedKeys={selectedOpening?.name?.toString()}
        selectedKeys={selectedOpening?._id?.toString()}
      >
        {Array.isArray(openings) && openings.length > 0 ? (
          openings?.map((option: IChessOpening, index: number) => (
            <SelectItem
              key={option?._id ? option?._id.toString() : index}
              value={option?._id ? option?._id.toString() : index}
            >
              {option.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem key="0" value="0">
            No openings
          </SelectItem>
        )}
      </Select>
    );
  };

  return (
    <div className="flex flex-col justify-between dropdown-with-toggle ">
      <DropdownOrNone />
      <div className="flex flex-row  mt-2 p-0 mb-0 pb-4 justify-between align-middle items-center ">
        <div className="flex flex-row justify-center items-center  p-0  gap-2 ">
          <span className="text-secondary py-0 ">{toggleLabel}:</span>
          <Switch
            checked={toggleChecked}
            color="success"
            onChange={() => handleToggleChange()}
          />
        </div>
      </div>
    </div>
  );
};

export const OnlyDropDown = ({
  options,
  onToggleChange,
  game,
  toggleLabel,
  handleSelectionChange,
}: any) => {
  const { openingsForDropDown, selectedOpening } = useOpenings();

  const [selectedOption, setSelectedOption] = useState<
    Set<mongoose.Types.ObjectId> | undefined
  >(undefined);

  useEffect(() => {
    if (openingsForDropDown.length > 0) {
      const val = openingsForDropDown.find(
        (o) => o.value === selectedOpening?._id
      );
      if (!val) return;
      setSelectedOption(new Set([val.value]));
    }
  }, [openingsForDropDown, selectedOpening]);

  return (
    <div className="flex flex-col justify-between dropdown-with-toggle ">
      <Select
        placeholder="Select an opening"
        items={openingsForDropDown}
        onChange={(event) => handleSelectionChange(event)}
        label="Select an opening"
        defaultSelectedKeys={selectedOption?.keys().next().value.toString()}
        selectedKeys={selectedOption?.keys().next().value.toString()}
        variant="flat"
      >
        {openingsForDropDown.map((option, index) => (
          <SelectItem
            key={option.value.toString()}
            value={option.value.toString()}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
