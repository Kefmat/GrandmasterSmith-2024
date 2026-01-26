import Post from "./Post";
export default interface PostFormProps {
  handleSetPosts: (posts: Post[]) => void;
}
