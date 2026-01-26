import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
interface SocialNetworkContextValue {
  posts: any[];
  setPosts: (posts: any[]) => void;
}

const SocialNetworkContext = createContext<SocialNetworkContextValue>({
  posts: [],
  setPosts: () => {},
});

/**
 * @description Social Network Context for å håndtere sosiale nettverksposter.
 * @author  Borgar Flaen Stensrud
 *
 */

export const SocialNetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  //const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      // Make an API call to check auth status
      try {
        const data = await axios
          .get("/api/social-network/posts")
          .then((res) => res?.data);
        if (!data) return;
        console.log("data", data);
        if (data === undefined) return;
        const allReadablePosts = data;
        setPosts(allReadablePosts.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <SocialNetworkContext.Provider value={{ posts, setPosts }}>
      {children}
    </SocialNetworkContext.Provider>
  );
};

export const useSocialNetwork = () => useContext(SocialNetworkContext);
