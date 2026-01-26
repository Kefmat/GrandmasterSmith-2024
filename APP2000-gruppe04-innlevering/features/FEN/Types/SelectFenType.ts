import { PostedFenDocument } from "../Models/PostedFen";

export default interface SelectFenType {
  fenList: PostedFenDocument[];
  handleFenClick: (item: PostedFenDocument) => void;
  loading: boolean;
}
