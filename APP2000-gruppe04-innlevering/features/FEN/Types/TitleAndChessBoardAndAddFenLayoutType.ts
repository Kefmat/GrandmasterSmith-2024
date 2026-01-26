import { PostedFenDocument } from "../Models/PostedFen";
export default interface TitleAndChessBoardAndAddFenLayoutType {
  boardWidth: number;
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleClearFen: () => void;
  fen: string;
}
