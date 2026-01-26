import User from "./User";

export default interface Comment {
  content: string;
  user: User;
  timestamp: Date;
  likedBy: User[];
  replies: Comment[];
}
