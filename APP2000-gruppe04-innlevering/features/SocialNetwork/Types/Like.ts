import User from "./User";
import Comment from "./Comment";
import Post from "./Post";
export default interface Like {
  user: User;
  target: Comment | Post;
  timestamp: Date;
}
