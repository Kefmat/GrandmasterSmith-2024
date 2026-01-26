import { useState } from "react";
import AddChessOpeningLayout from "@/features/OpeningMovesPractice/Layout/Component/SideMenuOpening/AddChessOpeningLayout";
import MainModal from "@/features/Common/Components/Modal/MainModal";
import Swal from "sweetalert2";

/**
 * @description AddOpeningComponent er et komponent som skal brukes for å legge til en ny åpning,
 * med FEN streng. Komponenten skal brukes i OpeningMovesPractice featuren.
 * Komponenten skal vise frem en knapp for å legge til en ny åpning, og en modal for å legge til en ny åpning.
 * Komponenten skal også vise frem en melding om at åpningen er lagt til.
 * Komponenten skal bruke MainModal komponenten for å vise frem modalen.
 * Komponenten skal bruke Swal for å vise frem meldinger.
 * Komponenten skal bruke AddChessOpeningLayout for å vise frem layouten.
 *
 * TODO: Mye å gjøre. Fikse funksjonalitet og implementere redux. Legge til bedre feldt i modalen.
 * TODO: validere input i modalen.
 * TODO: legge til fetch/( axios? ) for å legge til åpning.
 *
 * @author Borgar Flaen Stensrud
 * @usage <AddOpeningComponent /> in features/OpeningMovesPractice/Layout/Components/AddChessOpening.tsx
 * @example <AddOpeningComponent  />
 *
 * @type
 *
 * @use <AddChessOpeningLayout/>
 * @use <MainModal/>
 * @version 1.0 2024-23-03
 */

const AddOpeningComponent = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const initModal = [
    {
      label: "Name",
      placeholder: "Enter the name",
      validations: { required: true, minLength: 2, maxLength: 20 },
      type: "text", // Assuming MainModal supports 'type' prop for inputs
    },
    {
      label: "Moves",
      placeholder: "Enter the moves",
      validations: { required: true, minLength: 2, maxLength: 20 },
      type: "TextArea", // Assuming MainModal supports 'type' prop for inputs
    },
  ];

  const handleClick = () => {
    setShowModal(true); // Show the modal when button is clicked
  };
  const handleSubmit = (data: any) => {
    // Adjust the data type as needed
    console.log(data);
    setShowModal(false); // Close the modal after submission

    // Show success alert after submission

    Swal.fire({
      title: "Added Opening Move",
      html: "Opening move has been added successfully",
      timer: 2000,
      icon: "success",
      timerProgressBar: true,
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };
  // The `modal` function needs adjustment to work within the render method or as a component

  return (
    <>
      <AddChessOpeningLayout handleAddChessOpening={() => handleClick()} />

      {/* Conditionally render MainModal based on showModal state */}
      {showModal && (
        <MainModal
          inputConfigs={initModal}
          onSubmit={(data) => {
            console.log(data);
            handleSubmit(data); // Optionally close modal on submit
          }}
          submitLabel="Submit"
        />
      )}
    </>
  );
};

export default AddOpeningComponent;
