import Text from "@/features/Common/Components/Text/text";

import ScaledRandomVsRandom from "@/features/Common/Components/Chessboard/ScaledRandomVSRandom";
import { Button } from "@nextui-org/button";
import { ChessBoardItem } from "@/data/ChessBoardDisplayData";
import ParentContainer from "@/components/ParrentContainerPassingWidth/PCPW";
import { ParentWidthContext } from "@/components/ParrentContainerPassingWidth/PCPW";
import React from "react";

function ChessBoardCollectionItem({ name, count, pro }: ChessBoardItem) {
  const parentWidth = React.useContext(ParentWidthContext);
  console.log("parentWidth: ", parentWidth);
  return (
    <div className="flex flex-col  gap-2" style={{ width: "275px" }}>
      <div className="flex flex-col items-center gap-4">
        <ParentContainer>
          <ScaledRandomVsRandom boardWidth={275} />
        </ParentContainer>
        {(name || count > 0) && (
          <Button
            color="primary"
            size="md"
            className="flex flex-row justify-center items-center"
          >
            {name && (
              <Text variant="h6" color="secondary">
                {name}
              </Text>
            )}
            {count} {count === 1 ? "Example" : "Examples"}
          </Button>
        )}
      </div>
    </div>
  );
}
export default ChessBoardCollectionItem;
