import React from "react";
import { Container } from "@chakra-ui/react";
import AIChessLayoutSection from "../sections/AIChessLayoutSection";
import GameStateComponent from "../Components/NewGame/GameState";
import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";

const AIChessPageLayout = ({}) => {
 
  return (
    <Container className="grid grid-rows-2 grid-flow-row gap-5" style={{}}>
      <div className="flex flex-row justify-start gap-5  mt-5">
        <div className="flex flex-col gap-5 justify-start col-span-3 ">
          <GameStateComponent />
        </div>
      </div>
    </Container>
  );
};
export default AIChessPageLayout;
