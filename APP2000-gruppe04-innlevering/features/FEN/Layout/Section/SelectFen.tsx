import React from "react";
import { Button } from "@nextui-org/react";

import { Grid } from "@chakra-ui/react";
import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";
import Text from "@/features/Common/Components/Text/text";
import { useTranslation } from "react-i18next";

export interface SelectFenType {
    fenList: PostedFenDocument[];
    handleFenClick: (item: PostedFenDocument) => void;
    loading: boolean;
}

/**
 * @description SelectFen er en layout for å velge fen å vise frem i practiceChess.
 * @author Borgar Flaen Stensrud
 * @usage <SelectFen /> in layout/pages/practiceChess/index.tsx
 * @example <SelectFen fenList={fenList} handleFenClick={handleFenClick} loading={loading} />
 *
 * @type {SelectFenType}, fenList, handleFenClick, loading
 *
 * @use react
 * @use <Button /> fra @nextui-org/react
 * @use <Grid /> fra @mui/material
 * @use <PostedFenDocument /> fra @/model/PostedFen TODO bytte til interface fra ./types
 * @use <Text /> fra @components/Text/text
 * @version 1.0 2024-28-01
 *
 * TODO: export interface
 */

const SelectFen = ({ fenList, handleFenClick, loading }: SelectFenType) => {
    const { t } = useTranslation();

    return (
        <Grid justifyContent="end" className="">
            <div
                className="flex flex-col gap-4 justify-end items-center "
                style={{ minWidth: "100%" }}
            >
                <Text variant="h1" color="tertiary" size="xxl">
                    {t("selectFen")}
                </Text>
                {fenList.map((item, key) => (
                    <div key={key} className="flex flex-col  items-between  w-full">
                        <Button
                            color="secondary"
                            isDisabled={loading}
                            onClick={() => handleFenClick(item)}
                            className="text-primary shadow-lg mt-5"
                            fullWidth
                        >
                            {item.title}
                        </Button>
                    </div>
                ))}
            </div>
        </Grid>
    );
};
export default SelectFen;
