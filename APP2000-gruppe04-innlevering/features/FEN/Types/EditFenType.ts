import { PostedFenDocument } from "../Models/PostedFen";

export default interface EditFenType {
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleDeleteFen: (id: string) => void;
  handleEditFen: (fen: PostedFenDocument) => void;
  handleSetEdit: (fen: PostedFenDocument) => void;
  edit: boolean;
  editFen: string;
  editTitle: string;
  handleEditFenStringChange: (e: string) => void;
  isFenEditValid: boolean;
  handleEditTitleChange: (e: string) => void;
  isTitleEditValid: boolean;
  setEdit: (edit: boolean) => void;
  setEditFen: (fen: string) => void;
  setEditTitle: (title: string) => void;
  handleFenChange: (e: string) => void;
  validFen: boolean;
  newFen: string;
  newTitle: string;
  handleTitleChange: (e: string) => void;
  validTitle: boolean;
  handleAddFen: () => void;
  boardWidth: number;
}
