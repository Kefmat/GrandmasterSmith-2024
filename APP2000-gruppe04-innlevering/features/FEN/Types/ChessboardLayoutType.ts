import TitleAndChessBoardAndAddFenLayoutDataType from "./TitleAndChessBoardAndAddFenLayoutDataType";
import SelectFenType from "./SelectFenType";
import EditFenTypeData from "./EditFenTypeData";
export default interface ChessboardLayoutType {
  chessboardAndAddFENData: TitleAndChessBoardAndAddFenLayoutDataType;
  selectFenData: SelectFenType;
  editFenData: EditFenTypeData;
}
