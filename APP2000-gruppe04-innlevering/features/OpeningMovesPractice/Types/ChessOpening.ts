/**
 * ChessOpening type
 * @usage ChessOpening, ChessOpening[], ChessOpeningProps, ChessOpeningState, ChessOpeningDocument, ChessOpeningDocument[], ChessOpeningDocumentProps
 * @description ChessOpening type for opening moves i sjakk
 */

type ChessOpening = {
  name: string;
  moves: {
    moveName: string;
    move: { from: string; to: string };
    completed: number;
  }[];
  completed: number;
};

export default ChessOpening;
