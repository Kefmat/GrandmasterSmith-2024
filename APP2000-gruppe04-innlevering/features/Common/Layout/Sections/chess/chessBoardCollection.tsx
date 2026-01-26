import Box from "@/features/Common/Components/Box/box";
import Text from "@/features/Common/Components/Text/text";
import ChessBoardCollectionItem from "@/features/Common/Layout/Component/chessBoardCollectionItem";
import type { ChessBoardData } from "@/data/ChessBoardDisplayData";
import type { ChessBoardItem } from "@/data/ChessBoardDisplayData";

/**
 * @description ChessBoardCollection er en layout for å å vise frem sjakkbrett på landingssiden.
 * @author Borgar Flaen Stensrud
 * @usage <ChessboardCollection data={data} index={index} /> in layout/sections/chess/chessBoardCollectionDisplay.tsx
 * @example <Counters/>
 *
 * @use box,
 * @use Text
 * @use ChessBoardCollectionItem
 *
 * @see chessBoardCollectionDisplay
 * @see chessBoardCollectionItem
 *
 * @version 1.0 2024-28-01
 *
 * TODO: improve: make data be dynamic from server. hva er index til?
 */

function ChessBoardCollection({
  data,
  index,
}: {
  data: (ChessBoardData & { items: ChessBoardItem[] }) | undefined;
  index: number;
}) {
  const { title, description, items } = data || {};

  //TODO: make the title and description sticky...
  return (
    <div>
      <div
        key={title}
        className="flex flex-row justify-start items-start gap-4"
        style={{
          marginBottom: "5rem",
          position: "relative", // Position of the first div is relative, others are static
        }}
      >
        <div
          style={{
            position: "relative",
            marginRight: "5rem",
            marginTop: "0.5rem",
          }}
        >
          <Box>
            <Text
              variant="h5"
              style={{
                padding: "0.25rem",
                paddingLeft: "0.5rem",
                marginBottom: "0.25rem",
                width: "100%",
                zIndex: 1,
                position: "sticky",
                top: "200px",
                color: "white",
                minWidth: "300px",
              }}
              className="bg-primary text-secondary"
            >
              {title}
            </Text>
            <Text variant="body3" color="primary">
              {description}
            </Text>
          </Box>
        </div>
        <div
          style={{ rowGap: "2rem" }}
          className="flex flex-row grow flex-wrap justify-start items-start"
        >
          {items &&
            items?.map(({ image, name, count, route, pro }) => (
              <div key={name} className="grow" style={{ width: "30%" }}>
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
    </div>
  );
}
export default ChessBoardCollection;
