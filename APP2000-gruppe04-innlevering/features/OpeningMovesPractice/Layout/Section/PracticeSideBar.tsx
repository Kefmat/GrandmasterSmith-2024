import React, { useState } from "react";

import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";
import AddChessOpening from "@/features/OpeningMovesPractice/Layout/Component/SideMenuOpening/AddChessOpeningLayout";
import { OpeningDropdown } from "@/features/OpeningMovesPractice/Layout/Component/StoredOpeningsDropDown/StoredOpeningsDropDown";
import { Button, Card, DropdownTrigger } from "@nextui-org/react";
import MoveList from "@/features/OpeningMovesPractice/Layout/Component/MoveList/MoveListLayout";
import MoveListControlPanel from "@/features/OpeningMovesPractice/Components/MoveListControlPanel";
import AddOpeningComponent from "@/features/OpeningMovesPractice/Components/AddOpening";
import {
  AccountCircle,
  BugReport,
  Circle,
  CloudDownload,
  FastForward,
  FastRewind,
  FiberSmartRecord,
  Info,
  MenuOpen,
  PlayArrow,
  PublishSharp,
  Search,
} from "@mui/icons-material";
import Text from "@/features/Common/Components/Text/text";
import styles from "../../Styles/Sidebar.module.css";
import { Popover } from "@/features/Common/Components/Popover/popover";

import { useTranslation } from "react-i18next";

export interface TitleAndChessBoardAndAddFenLayoutType {
  boardWidth: number;
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleClearFen: () => void;
  fen: string;
}
export interface TitleAndChessBoardAndAddFenLayoutDataType {
  data: TitleAndChessBoardAndAddFenLayoutType;
}

/**
 * @description Samlings layout for å velge åpning og legge til ny åpning,
 * samt kontrollpanel for valgte åpning.
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <PickOpeningSection />
 * @version 1.0 2024-23-03
 */

const PickOpeningSection = ({}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSideMenu = () => setIsExpanded(!isExpanded);

  const { t } = useTranslation();

  const displayPopover = () => {
    //display a popover
  };

  return (
    <div className="h-2/3 flex justify-end">
      <div
        className={`h-full z-50 flex flex-col justify-between  rounded-none
       
       ${isExpanded ? "w-100 translate-y-20" : "w-14"}
       
       `}
      >
        <div className="bg-success p-2 flex flex-row gap-5">
          {isExpanded ? (
            <>
              <div className="text-secondary" style={{ fontSize: "20px" }}>
                <MenuOpen
                  fontSize="large"
                  style={{ cursor: "pointer" }}
                  onClick={toggleSideMenu}
                />
              </div>
              <Text
                variant="h2"
                size="xl"
                color="secondary"
                className="text-center"
              >
                {t("select-opening")} <Info onClick={displayPopover} />
              </Text>
            </>
          ) : (
            <div className="flex flex-col items-center justify-start h-full gap-4 p-2 text-secondary bg-dark">
              <IconsWithPopovers
                icon={<Search fontSize="large" />}
                component={<OpeningDropdown />}
              />
              <IconWithGlow icon={<Circle color="error" fontSize="large" />} />
              <IconWithGlow icon={<PlayArrow fontSize="large" />} />
              <IconWithGlow icon={<FastForward fontSize="large" />} />
              <IconWithGlow icon={<FastRewind fontSize="large" />} />
              <IconsWithPopovers
                icon="FEN"
                component={<AddOpeningComponent />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const IconWithGlow = ({ icon }: any) => (
  <div
    className={` p-2 hover:bg-success transition-all ease-in duration-75 cursor-pointer`}
  >
    {icon}
  </div>
);

const IconsWithPopovers = ({ icon, component }: any) => {
  const glowingIcon = IconWithGlow({ icon });
  return (
    <Popover icon={glowingIcon}>
      <Card className="bg-primary p-5">{component}</Card>
    </Popover>
  );
};

export default PickOpeningSection;
