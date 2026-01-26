import isValidFen from "@/features/FEN/Validators/fenValidator";
import React, { useEffect, useState } from "react";

import type {
  TitleAndChessBoardAndAddFenLayoutDataType,
  TitleAndChessBoardAndAddFenLayoutType,
} from "@/features/FEN/Layout/Section/TitleAndChessBoardAndAddFenLayout";
import type { PostedFenDocument } from "@/features/FEN/Models/PostedFen";
import { SelectFenType } from "@/features/FEN/Layout/Section/SelectFen";
import {
  EditFenType,
  EditFenTypeData,
} from "@/features/FEN/Layout/Section/EditFen";

import { Grid } from "@mui/material";

import TitleAndChessBoardAndAddFenLayout from "@/features/FEN/Layout/Section/TitleAndChessBoardAndAddFenLayout";
import SelectFen from "@/features/FEN/Layout/Section/SelectFen";
import EditFen from "@/features/FEN/Layout/Section/EditFen";

export interface ChessboardLayoutDataType {
  data: ChessboardLayoutType;
}

export interface ChessboardLayoutType {
  chessboardAndAddFENData: TitleAndChessBoardAndAddFenLayoutDataType;
  selectFenData: SelectFenType;
  editFenData: EditFenTypeData;
}
interface SimpleFenDocument {
  fen: string;
  title: string;
  _id: any;
}
/**
 * @description Gammel kode fra første innlevering som ble brukt til å lage en fen-app
 * @author Borgar Flaen Stensrud & resten av gruppen
 */

const PracticeOpening = () => {
  //* Ny FEN
  const [fen, setFen] = useState<string>("");
  const [fenTitle, setFenTitle] = useState<string>("");

  const [newFen, setNewFen] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  //* Validation for ny FEN
  const [validFen, setValidFen] = useState<boolean>(false);
  const [validTitle, setValidTitle] = useState<boolean>(false);

  //* FEN som er lagt til i db.
  const [fenList, setFenList] = useState<PostedFenDocument[]>([]);

  //* FEN som er valgt.
  const [selectedFen, setSelectedFen] = useState<PostedFenDocument | null>(
    null
  );

  //* Rediger
  const [edit, setEdit] = useState<boolean>(false);
  const [editFen, setEditFen] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  //* Validation for rediger
  const [isTitleEditValid, setIsTitleEditValid] = useState<boolean>(false);
  const [isFenEditValid, setIsFenEditValid] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  //* Grafisk:
  //* Chessboard bredde; 400px;
  const [boardWidth, setBoardWidth] = useState<number>(400);

  useEffect(() => {
    const fetchFenList = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/addFen");

        if (!response.ok) {
          throw new Error("Failed to fetch FEN list from the server");
        }

        const data = await response.json();
        setFenList(data.fenList);

        if (data.fenList.length > 0) setSelectedFen(data.fenList[0]);
        console.log("loading fen list");
        setLoading(false);
        console.log("FEN list done loading");
      } catch (error: any) {
        console.error("Error fetching FEN list:", error.message);

        setLoading(false);
      }
    };

    fetchFenList();
  }, []);

  const handleFenChange = (fen: string) => {
    isValidFen(fen) ? setValidFen(true) : setValidFen(false);
    setNewFen(fen);
  };

  const handleTitleChange = (title: string) => {
    validateTitle(title) ? setValidTitle(true) : setValidTitle(false);
    setNewTitle(title);
  };

  const handleEditFenStringChange = (fen: string) => {
    setEditFen(fen);
    isValidFen(fen) ? setIsFenEditValid(true) : setIsFenEditValid(false);
  };

  const handleEditTitleChange = (title: string) => {
    setEditTitle(title);
    validateTitle(title)
      ? setIsTitleEditValid(true)
      : setIsTitleEditValid(false);
  };

  const handleSetEdit = (selectedFen: PostedFenDocument | null) => {
    setEdit(true);
    setEditFen(selectedFen!.fen);
    setEditTitle(selectedFen!.title);
    setIsFenEditValid(isValidFen(selectedFen!.fen));
    setIsTitleEditValid(validateTitle(selectedFen!.title));
  };

  const handleAddFen = async () => {
    const fenListObject = { fen: newFen, title: newTitle };

    try {
      setLoading(true);
      const response = await fetch("/api/addFen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fenListObject),
      });

      if (!response.ok) {
        throw new Error("Failed to add FEN to the server");
      }
      const data = await response.json();

      setFenList([...fenList, data.fen]);
      setFen(data.fen.fen);
      setFenTitle(data.fen.title);
      setSelectedFen(data.fen);
      setEdit(false);
      setNewFen("");
      setNewTitle("");
      console.log("FEN added successfully");

      setLoading(false);
    } catch (error: any) {
      console.error("Error adding FEN:", error.message);

      setLoading(false);
    }
  };

  const handleFenClick = (selectedFen: PostedFenDocument) => {
    setSelectedFen(selectedFen);
    setEditFen(selectedFen.fen);
    setEditTitle(selectedFen.title);
    setFen(selectedFen.fen);
    setEdit(false);
  };

  const handleDeleteFen = async (fenDelete: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/addFen", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: fenDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete FEN from the server");
      }
      const data = await response.json();
      const newFenList = fenList.filter((item) => item._id !== fenDelete);
      setFenList(newFenList);
      console.log("FEN deleted successfully", data.fen);
      if (newFenList.length > 0) setSelectedFen(newFenList[0]);
      setEdit(false);
      setLoading(false);
    } catch (error: any) {
      console.error("Error deleting FEN:", error.message);

      setLoading(false);
    }
  };

  const handleEditFen = async (selectedFen: PostedFenDocument | null) => {
    if (!isFenEditValid || !isTitleEditValid) return;
    if (selectedFen?.title === editTitle && selectedFen?.fen === editFen)
      return;

    const fenListObject: PostedFenDocument = {
      fen: editFen,
      title: editTitle,
      _id: selectedFen!._id,
    };

    try {
      setLoading(true);
      //* PUT FEN til db
      //TODO: fixs api/addFen.tsx skal ikke hete add på put
      const response = await fetch("/api/addFen", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fenListObject),
      });

      //* Sjekk om det er en error
      if (!response.ok) {
        throw new Error("Failed to add FEN to the server");
      }

      //* FEN er oppdatert i db
      const data = await response.json();
      if (data.modifiedCount === 0)
        throw new Error("Failed to update FEN to the server");

      //* Slett den gamle FEN fra FEN-listen
      const theFenList = fenList.filter(
        (item) => item._id !== fenListObject._id
      );

      //* Oppdater FEN-listen
      setFenList([...theFenList, fenListObject]);
      const latestFen = fenListObject;

      //* Oppdater edit-delen
      setEdit(false);
      setSelectedFen(latestFen);
      setEditFen(latestFen.fen);
      setEditTitle(latestFen.title);
      console.log("FEN updated successfully", latestFen?.title);

      //* Ferdig med PUT
      console.log("FEN updated successfully");
      setLoading(false);
    } catch (error: any) {
      console.error("Error adding FEN:", error.message);

      setLoading(false);
    }
  };

  const validateTitle = (title: string) => {
    const regex = /^[a-zA-Z0-9 ]{1,30}$/; // Alphanumeric characters and spaces, length 1-30
    return regex.test(title);
  };

  const handleClearFen = () => {
    setFen("start");
    setFenTitle("Start FEN");
    setValidFen(false);
    setValidTitle(false);
    setNewFen("");
    setNewTitle("");
    const startFen: PostedFenDocument = {
      fen: "start",
      title: "Start FEN",
      _id: "start",
    };
    setSelectedFen(startFen);
    setEdit(false);
    setEditFen("");
    setEditTitle("");
    setIsFenEditValid(false);
    setIsTitleEditValid(false);
  };

  const chessboardAndAddFENData: TitleAndChessBoardAndAddFenLayoutType = {
    boardWidth,
    selectedFen,
    loading,
    handleClearFen,
    fen,
  };

  const selectedFenData: SelectFenType = {
    loading,
    handleFenClick,
    fenList,
  };

  const editFenType: EditFenType = {
    selectedFen,
    loading,
    handleDeleteFen,
    handleEditFen,
    handleSetEdit,
    edit,
    editFen,
    editTitle,
    handleEditFenStringChange,
    isFenEditValid,
    handleEditTitleChange,
    isTitleEditValid,
    setEdit,
    setEditFen,
    setEditTitle,
    handleFenChange,
    validFen,
    newFen,
    newTitle,
    handleTitleChange,
    validTitle,
    handleAddFen,
    boardWidth,
  };

  const editFenData: EditFenTypeData = {
    data: editFenType,
  };

  const chessBoardLayout: ChessboardLayoutType = {
    chessboardAndAddFENData: {
      data: chessboardAndAddFENData,
    },
    selectFenData: selectedFenData,
    editFenData,
  };

  const data: ChessboardLayoutDataType = {
    data: chessBoardLayout,
  };

  return (
    <Grid
      container
      sm={12}
      lg={12}
      md={12}
      gap={5}
      justifyContent="space-between"
    >
      <TitleAndChessBoardAndAddFenLayout data={chessboardAndAddFENData} />
      <SelectFen
        loading={loading}
        handleFenClick={handleFenClick}
        fenList={fenList}
      />
      <EditFen data={editFenData.data} />
    </Grid>
  );
};
export default PracticeOpening;
