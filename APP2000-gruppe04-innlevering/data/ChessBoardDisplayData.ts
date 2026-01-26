//export const getMenuDataServerSide = async (ctx) => {
// ... (existing server-side logic)
//};

export interface ChessBoardData {
  title: string;
  description: string;
  items: ChessBoardItem[];
}

export interface ChessBoardItem {
  // Define the properties of ChessBoardItem here
  image: string;
  name: string;
  count: number;
  route: string;
  pro: boolean;
}
async function getChessBoardDisplayData(): Promise<ChessBoardData[]> {
  try {
    const response = await fetch("/api/chess-board-display-landing-page-data");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching menu data client-side:", error);
    throw error;
  }
}
export default getChessBoardDisplayData;
