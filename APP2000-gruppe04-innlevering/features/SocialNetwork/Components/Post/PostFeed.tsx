import { useSocialNetwork } from "@/providers/SocialNetworkContext";
import Post from "../../Layout/Component/Post";

/**
 * @description PostFeed er et komponent som viser frem en feed av poster.
 * @author  Borgar Flaen Stensrud
 *
 */

const PostFeed = ({ thePosts }: { thePosts: any[] }) => {
  const posts = Array.from(thePosts);
  return (
    <div className="flex flex-col gap-3 justify-center items-center pb-20 ">
      {posts ? (
        posts.map((post: any) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default PostFeed;
