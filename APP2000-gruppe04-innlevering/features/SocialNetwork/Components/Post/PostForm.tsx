import PostFormLayout, {
  PostFormLayoutProps,
} from "@/features/SocialNetwork/Layout/Sections/PostFormLayout";
import { Post } from "@/features/SocialNetwork/Layout/Page/SocialNetworkLayout";
import axios from "axios";
import React, { useState } from "react";

export interface PostFormProps {
  handleSetPosts: (post: Post) => void;
}
/**
 * @description PostForm er et komponent som lar brukeren poste en ny post.
 * @author  Borgar Flaen Stensrud
 *
 */

const PostForm = ({ handleSetPosts }: PostFormProps) => {
  const [description, setDescription] = useState("");
  const [isPostAdded, setIsPostAdded] = useState(false);
  const [post, setPost] = useState({});

  const handlePost = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios
      .post(
        "/api/social-network/posts/",
        { post: { description } }
        //TODO fix, legg på token fra evt login.
      )
      .then((response) => {
        handleSetPosts(response.data.post);
        setIsPostAdded(true);
      })
      .catch((error) => {
        //ErrorHandling(error);
        console.log(error);
      });
  };

  return (
    <PostFormLayout
      setDescription={setDescription}
      description={description}
      handlePost={handlePost}
    />
  );
};

export default PostForm;
