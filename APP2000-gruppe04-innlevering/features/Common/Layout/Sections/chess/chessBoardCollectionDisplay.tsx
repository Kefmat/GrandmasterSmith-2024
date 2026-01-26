import Text from "@/features/Common/Components/Text/text";

import getChessBoardDisplayData, {
  ChessBoardData,
} from "@/data/ChessBoardDisplayData";
import { useEffect, useState } from "react";
import { Badge } from "@nextui-org/react";
import ChessBoardCollection from "@/features/Common/Layout/Sections/chess/chessBoardCollection";
import { useTranslation } from "react-i18next";
import { useOpenings } from "@/providers/OpeningsContext";
import ScaledRandomVsRandom from "@/features/Common/Components/Chessboard/ScaledRandomVSRandom";
/**
 * @description ChessBoardsDisplay er en layout for å å vise frem sjakkbrett på landingssiden.
 * @author Borgar Flaen Stensrud
 * @usage <ChessBoardsDisplay /> in layout/pages/LandingPage/index.tsx
 * @example <ChessBoardsDisplay/>
 *
 * @use text from @components/Text/text
 * @use getChessBoardDisplayData from @/data/ChessBoardDisplayData
 * @use ChessBoardCollection from @/layout/section/chess/chessBoardCollection
 * @use useEffect, useState from react
 * @use Badge from @nextui-org/react
 *
 * @see chessBoardCollection
 * @see chessBoardCollectionItem
 *
 * @version 1.0 2024-28-01
 *
 * TODO: improve: make data be dynamic from server.
 */

function ChessBoardsDisplay() {
  const { t } = useTranslation();
  const [data, setData] = useState<ChessBoardData[]>([]);
  const { openings } = useOpenings();
  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await getChessBoardDisplayData();
      if (result) {
        setData(result);
      }
    };
    fetchDataAsync();
  }, []);
  if (!data) {
    return <div>{t("loading")}</div>;
  }
  const renderData = data?.map(({ title, description, items }, index) => (
    <ChessBoardCollection
      data={{ title, description, items }}
      index={index}
      key={index}
    />
  ));

  /*const renderData = data?.map(({ title, description, items }) => (
    <div
      key={title}
      className="flex flex-row justify-start items-start  relative gap-4"
      style={{
        marginBottom: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "fixed",
        }}
      >
        <Box
          style={{
            padding: "0.25rem",
            width: "100%",
          }}
          className="bg-primary text-secondary"
        >
          {title}
        </Box>
        <Text variant="body3" color="primary">
          {description}
        </Text>
      </div>
      <div
        style={{ rowGap: "2rem" }}
        className="flex flex-row grow flex-wrap justify-start items-start"
      >
        {items &&
          items?.map(({ image, name, count, route, pro }) => (
            //TODO fix responsive design
            <div key={name} className="grow " style={{ width: "25%" }}>
              <ChessBoardCollectionItem
                image={image}
                name={name}
                count={count}
                pro={pro}
                route={route}
              />
            </div>
          ))}
      </div>
    </div>
  ));*/

  return (
    <div
      className="mt-5 p-5 flex flex-col gap-4 justify-between"
      style={{
        paddingTop: "5rem",
      }}
    >
      <Text variant="h2" size="3xl" color="primary" alignment="center">
        {t("infiniteCombinations")}
      </Text>
      <div className="flex flex-row gap-20">
        <div className="flex flex-col w-52">
          <Text
            variant="h2"
            style={{ marginTop: "30px" }}
            size="xxl"
            color="primary"
          >
            {t("hugeCollection")}
          </Text>
          <Text variant="body1" color="tertiary">
            {t("hugeCollectionDescription")}
          </Text>
        </div>
        <div className="flex flex-row gap-5 flex-wrap justify-start max-w-100">
          {openings &&
            openings.length > 0 &&
            openings.map((opening: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-4 bg-secondary p-4 rounded-md shadow-md"
                style={{ maxWidth: "350px" }}
              >
                <Text variant="h3" size="lg" color="primary">
                  {opening.name}
                </Text>
                <ScaledRandomVsRandom pgn={opening.pgn} />

                <Text variant="body1" color="tertiary">
                  {opening.description}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChessBoardsDisplay;
