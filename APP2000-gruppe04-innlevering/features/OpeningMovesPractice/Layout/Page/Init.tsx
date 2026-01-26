import DisplayPracticeOpeningChessBoard from "@/features/OpeningMovesPractice/Layout/Section/PracticeChessBoard";

import {
  OpeningDropdown,
  OpeningDropdownInitPractice,
} from "@/features/OpeningMovesPractice/Layout/Component/StoredOpeningsDropDown/StoredOpeningsDropDown";

import { Button } from "@nextui-org/react";
import Text from "@/features/Common/Components/Text/text";
import { CardHeader, Container, Card, CardBody, Flex } from "@chakra-ui/react";
import { Circle } from "@mui/icons-material";

import { GameStateExtended } from "../../Types/GameState";
import { useGame } from "@/providers/GameContext";
import { useOpenings } from "@/providers/OpeningsContext";

import { useTranslation } from "react-i18next";

const PracticeOpeningInitLayout = ({
  game,
  onGameStateChange,
  startRecording,
}: any) => {
  const { setCurrentMoveIndex } = useOpenings();

  const { t } = useTranslation();
  const handleRecord = () => {
    setCurrentMoveIndex(0);
    startRecording();
  };

  return (
    <Container maxW="container.sm" className="gap-5" style={{}}>
      <div className="flex flex-row justify-center gap-5  mt-5">
        <div className="flex flex-col gap-5 bg-secondary rounded-lg shadow-lg ">
          <Card size="lg" className="">
            <CardHeader className="bg-success text-secondary p-0   text-center">
              <Text
                variant="h2"
                size="xxl"
                className="mb-2 p-5 px-2 text-center"
                color="secondary"
              >
                {t("practice-mode")}
              </Text>
              <OpeningDropdownInitPractice
                onGameStateChange={(state: GameStateExtended) =>
                  onGameStateChange(state)
                }
                game={game}
              />
            </CardHeader>
            <CardBody className="p-5">
              <Flex direction="column" justify="center">
                <Text
                  variant="h5"
                  size="xl"
                  color="tertiary"
                  className="text-center mb-3"
                >
                  {t("record-your-own-moves")}
                </Text>
                <Button
                  color="danger"
                  className="mx-3"
                  variant="solid"
                  onClick={handleRecord}
                >
                  {t("record")} <Circle />
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};
export default PracticeOpeningInitLayout;
