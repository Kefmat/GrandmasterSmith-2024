import React, { use, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import ChessOpening from "@/features/OpeningMovesPractice/Types/ChessOpening";
import { Share } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * @description Layout for å legge til en knapp for ny åpning med FEN.
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <AddChessOpeningLayout handleAddChessOpening={handleAddChessOpening} />
 * @use <Button/> fra @nextui-org/button
 * @version 1.0 2024-23-03
 */

const AddChessOpeningLayout = ({ handleAddChessOpening }: any) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-row gap-3 justify-between">
            <Button
                onClick={() => handleAddChessOpening()}
                color="success"
                className="w-100 text-white"
            >
                {t("addFEN")}
            </Button>
            <Button
                onClick={() => handleAddChessOpening()}
                color="success"
                className="w-100 text-white"
            >
                {t("addPNG")}
            </Button>
            <Button
                onClick={() => handleAddChessOpening()}
                color="warning"
                className="w-100 text-white"
            >
                {t("share")} <Share />
            </Button>
        </div>
    );
};
export default AddChessOpeningLayout;
