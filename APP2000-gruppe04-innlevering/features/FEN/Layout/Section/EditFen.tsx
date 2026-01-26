import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useEffect } from "react";
import Text from "@/features/Common/Components/Text/text";
import { Grid } from "@chakra-ui/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Edit, Save } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export interface EditFenType {
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleDeleteFen: (id: string) => void;
  handleEditFen: (fen: PostedFenDocument) => void;
  handleSetEdit: (fen: PostedFenDocument) => void;
  edit: boolean;
  editFen: string;
  editTitle: string;
  handleEditFenStringChange: (e: string) => void;
  isFenEditValid: boolean;
  handleEditTitleChange: (e: string) => void;
  isTitleEditValid: boolean;
  setEdit: (edit: boolean) => void;
  setEditFen: (fen: string) => void;
  setEditTitle: (title: string) => void;
  handleFenChange: (e: string) => void;
  validFen: boolean;
  newFen: string;
  newTitle: string;
  handleTitleChange: (e: string) => void;
  validTitle: boolean;
  handleAddFen: () => void;
  boardWidth: number;
}

export interface EditFenTypeData {
  data: EditFenType;
}

/**
 * @description EditFen er en layout for å redigere fen  i practiceChess samt for å legge til.
 * @author Borgar Flaen Stensrud
 * @usage <EditFen /> in layout/pages/practiceChess/index.tsx
 * @example <EditFen ...children />
 *
 * @type {EditFenTypeData}, data
 *
 * @use react
 * @use <PostedFenDocument /> fra @/model/PostedFen
 * @use <Button />, <Input />, <Textarea /> fra @nextui-org/react
 * @use <Text /> fra @components/Text/text
 * @use <Icon /> fra @mui/material
 * @use <Grid /> fra @mui/material
 * @media <DeleteForeverIcon /> fra @mui/icons-material
 * @media <Edit />, <Save /> fra @mui/icons-material
 *
 * @version 1.0 2024-28-01
 *
 * TODO: export interface, rename to EditFenLayout
 */

const EditFen = ({ data }: EditFenTypeData) => {
  const { t } = useTranslation();
  const {
    selectedFen,
    loading,
    handleDeleteFen,
    handleEditFen,
    handleSetEdit,
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
    edit,
  } = data;

  const renderEdit = () => {
    return (
      <div className="flex flex-col shadow-md  bg-secondary p-5 items-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Text variant="h1" color="tertiary" size="xxl">
            {selectedFen?.title && selectedFen.title}
          </Text>
          <Text variant="h5" color="success" size="md">
            {edit ? t("saveFenString") : t("editFenString")}
          </Text>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {selectedFen?.fen && edit && (
            <Input
              className="light"
              onChange={(e) => handleEditTitleChange(e.target.value)}
              value={editTitle}
              isClearable
              onClear={() => setEditTitle(selectedFen.title)}
              description={t("enterTitleDescription")}
              placeholder={t("titlePlaceholder")}
              isInvalid={!isTitleEditValid}
              color={!isTitleEditValid ? "danger" : "success"}
              style={{ width: "100%" }}
              errorMessage={!isTitleEditValid && t("titleErrorMessage")}
              isDisabled={loading}
            />
          )}

          {selectedFen?.fen && edit ? (
            <Textarea
              className="light mt-2"
              onChange={(e) => handleEditFenStringChange(e.target.value)}
              description={t("enterFenDescription")}
              placeholder={t("fenPlaceholder")}
              isInvalid={!isFenEditValid}
              isMultiline
              color={!isFenEditValid ? "danger" : "success"}
              style={{ width: "100%" }}
              errorMessage={!isFenEditValid && t("fenErrorMessage")}
              value={editFen}
              isRequired
              isDisabled={loading}
            ></Textarea>
          ) : (
            <Text
              variant="h1"
              style={{
                maxWidth: "300px",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              color="tertiary"
              size="xxl"
            >
              {selectedFen?.fen}
            </Text>
          )}
        </div>
        <div className="flex flex-row gap-4 justify-center items-center mt-5">
          {selectedFen && (
            <Button
              onClick={() => {
                edit ? handleEditFen(selectedFen) : handleSetEdit(selectedFen);
              }}
              color={`${edit ? "success" : "primary"}`}
              className={`${
                edit ? "text-secondary" : "text-secondary"
              } shadow-md`}
              size="lg"
              style={{ padding: "1rem 1rem" }}
              isDisabled={loading}
            >
              {edit ? t("save") : t("editFen")}
              {edit ? <Save /> : <Edit />}
            </Button>
          )}
          {edit && (
            <div className="flex flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => {
                  setEdit(false);
                  setEditFen("");
                  setEditTitle("");
                }}
                color="primary"
                className="text-secondary shadow-md"
                size="lg"
                style={{ padding: "1rem 1rem" }}
                isDisabled={loading}
              >
                {t("cancel")}
              </Button>
              {selectedFen && (
                <Button
                  onClick={() => {
                    handleDeleteFen(selectedFen._id);
                  }}
                  isDisabled={loading}
                  color="danger"
                  size="lg"
                  style={{ marginLeft: "0.25rem" }}
                >
                  {t("delete")}
                  <DeleteForeverIcon />
                </Button>
              )}
              {edit && (
                <div className="flex flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => {
                      setEdit(false);
                      setEditFen("");
                      setEditTitle("");
                    }}
                    color="primary"
                    className="text-secondary shadow-md"
                    size="lg"
                    style={{ padding: "1rem 1rem" }}
                    isDisabled={loading}
                  >
                    {t("cancel")}
                  </Button>
                  {selectedFen && (
                    <Button
                      onClick={() => {
                        handleDeleteFen(selectedFen._id);
                      }}
                      isDisabled={loading}
                      color="danger"
                      size="lg"
                      style={{ marginLeft: "0.25rem" }}
                    >
                      {t("delete")}
                      <DeleteForeverIcon />
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  const renderAdd = () => {
    return (
      <div
        className="flex flex-col gap-4 flex-grow justify-center shadow-md bg-secondary p-5 items-center"
        style={{ maxWidth: "100%" }}
      >
        <Text variant="h1" color="tertiary" size="xxl">
          {t("addFenString")}
        </Text>
        <Textarea
          type="text"
          label={t("pasteFen")}
          value={newFen}
          onValueChange={(e) => handleFenChange(e)}
          isDisabled={loading}
          isInvalid={!validFen}
          color={validFen ? "success" : "danger"}
          errorMessage={!validFen && t("fenErrorMessage")}
          fullWidth
        ></Textarea>

        <Input
          type="text"
          label={t("titleLabel")}
          value={newTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          isDisabled={loading}
          isInvalid={!validTitle}
          color={!validTitle ? "danger" : "success"}
          errorMessage={!validTitle && t("titleErrorMessage")}
        />
        <Button
          color="success"
          className="text-secondary"
          isDisabled={loading}
          onClick={handleAddFen}
          size="lg"
          fullWidth
        >
          {t("addFen")}
        </Button>
      </div>
    );
  };

  return (
    <Grid>
      <div
        className="flex flex-col gap-4 justify-center items-center"
        style={{}}
      >
        {selectedFen && selectedFen.fen !== "start" ? renderEdit() : null}

        {renderAdd()}
      </div>
    </Grid>
  );
};

export default EditFen;
