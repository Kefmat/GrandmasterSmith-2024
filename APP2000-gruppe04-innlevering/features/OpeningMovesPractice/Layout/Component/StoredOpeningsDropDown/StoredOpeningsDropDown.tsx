import React from "react";
import {
  DropdownWithToggle,
  DropdownWithToggleWithoutDeleteAndPhoto,
} from "@/features/Common/Components/DropDown/DropDownWithToggle";

import Swal from "sweetalert2";
import AddOpeningComponent from "../../../Components/AddOpening";
import Text from "@/features/Common/Components/Text/text";
import { useOpenings } from "@/providers/OpeningsContext";

// ...

type Option = {
  label: string;
  value: string;
};

/**
 * OpeningDropdown, dropdown som bruker next-ui sin drop-down til å lage et dropdown layout for å velge opening
 * samt en toggle for å vise "My openings" og en knapp for å slette opening
 * og en knapp for å legge til en ny opening, og en knapp for å slette opening.
 * til slutt er det også et komponent for å legge til pgn
 * @author Borgar Flaen Stensrud
 * @method handleDeleteOpening - For å delete opening.
 * @method handleToggle - oppdaterer openings fra context provider til å
 * @returns {*}
 */
export const OpeningDropdown = () => {
  const { selectedOpening, openings, openingsForDropDown } = useOpenings();
  const handleDeleteOpening = async () => {
    console.log("deleting opening");
    if (!selectedOpening?._id) return;
    const id: string = selectedOpening?._id.toString();
    //TODO lage api - request for delete opening ! - Borgar
    Swal.fire({
      title: "Opening deleted",
      html: "The opening has been deleted successfully",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
  };
  const { setMyOpenings } = useOpenings();
  const handleToggle = async (checked: boolean) => {
    setMyOpenings(checked);
  };
  return (
    <div className="flex flex-col gap-5  bg-dark p-5 px-3">
      <div className="mx-0">
        <DropdownWithToggle
          options={openingsForDropDown}
          onToggleChange={handleToggle}
          onDelete={handleDeleteOpening}
          toggleLabel="My openings"
        />
      </div>
      <AddOpeningComponent />
    </div>
  );
};

/**
 * OpeningDropdownInitPractice, til initialisering av dropdown for å velge opening til practice moves.
 * til slutt er det også et komponent for å legge til pgn
 * @author Borgar Flaen Stensrud
 * @method handleDeleteOpening - For å delete opening.
 * @method handleToggle - oppdaterer openings fra context provider til å
 * @returns {*}
 */

export const OpeningDropdownInitPractice = ({
  game,
  onGameStateChange,
}: any) => {
  const {
    setMyOpenings,
    openings,
    setSelectedOpening,
    openingsForDropDown,
    setCurrentMoveIndex,
  } = useOpenings();
  const handleToggle = async (checked: boolean) => {
    setMyOpenings(checked);
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = openings.find((o) => o?._id?.toString() === e.target.value);

    if (!option) return;
    setSelectedOpening(option || undefined);
    setCurrentMoveIndex(0);
    if (onGameStateChange) onGameStateChange("RunningPractice");
  };
  return (
    <div className="flex flex-col gap-5  bg-dark p-3 px-3">
      <div className="mx-0">
        <Text
          variant="h2"
          size="lg"
          color="secondary"
          className="mx-1 mb-2 text-secondary "
        >
          Select opening
        </Text>
        <DropdownWithToggleWithoutDeleteAndPhoto
          options={openings}
          onToggleChange={handleToggle}
          toggleLabel="My openings"
          game={game}
          openings={openings}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};
