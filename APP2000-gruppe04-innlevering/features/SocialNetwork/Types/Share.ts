import User from "./User";
import Post from "./Post";
export default interface Share {
  user: User;
  post: Post;
  sharedBy: User;
  timestamp: Date;
  public: boolean;
}
