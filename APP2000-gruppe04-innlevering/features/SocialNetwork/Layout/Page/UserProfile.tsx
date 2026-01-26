import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "@/features/User/Layout/Sections/ProfileHeader";
import { Container } from "@chakra-ui/react";
import PostFeed from "@/features/SocialNetwork/Components/Post/PostFeed";
import Text from "@/features/Common/Components/Text/text";
interface UserProfileProps {
  userId: string;
}

/**
 * @description UserProfile layout for social network.
 * @author  Borgar Flaen Stensrud
 *
 */

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return console.error("No user found");
      try {
        const res = await axios.get("/api/social-network/profile/" + userId);
        if (!res?.data?.user)
          return console.error("No data returned from user profile");
        console.log("res", res);

        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <Container maxW="container.md">
      <ProfileHeader user={user} />
      <div className="ml-0 flex flex-col  gap-5 mt-5 py-5">
        <Text size="2xl" variant="h1">
          Posts by {user?.username}
        </Text>
        {posts?.length > 0 ? <PostFeed thePosts={posts} /> : <p>No posts</p>}
      </div>
    </Container>
  );
};

export default UserProfile;
