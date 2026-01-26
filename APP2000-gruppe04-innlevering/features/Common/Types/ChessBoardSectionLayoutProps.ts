export interface ChessBoardSectionLayoutProps {
  victory: boolean;
  fen: string;
  selectedColor: string;
  styledSquares: any;
  widthOfBoard: number;
  onDrop: (move: any) => boolean;
}
