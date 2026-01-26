import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@chakra-ui/react";
import MiniProfileLayout from "@/features/SocialNetwork/Layout/Sections/MiniProfileLayout";
import PostForm from "@/features/SocialNetwork/Components/Post/PostForm";
import { Chessboard } from "react-chessboard";
import FriendSuggestions from "../../Components/FriendSuggestion/FriendSuggestions";
import PostFeed from "../../Components/Post/PostFeed";

import { useAuth } from "@/providers/AuthContext";
import { Avatar } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
//TODO: Add the following:
//TODO: add posts page, contains posts mapped from the database, with a post component
export interface Like {
  user: User;
  target: Comment | Post;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
}

export interface Share {
  user: User;
  post: Post;
  sharedBy: User;
  timestamp: Date;
  public: boolean;
}

export interface Comment {
  content: string;
  user: User;
  timestamp: Date;
  likedBy: User[];
  replies: Comment[];
}

export interface Post {
  description: string;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  likedBy: User[];
  shares: Share[];
  public: boolean;
}

/**
 * @description SocialNetworkLayout layout for social network.
 * @author  Borgar Flaen Stensrud
 * !! må refaktoreres!
 */

export default function SocialNetworkLayout(feed: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [socialNetwork, setSocialNetwork] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState<User>({ username: "JohnDoe", id: "123" });
  const [userToken, setUserToken] = useState("");
  const [client, setClient] = useState(null);
  const [top5, setTop5] = useState([]);
  console.log("feed", feed);
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    profilePicture: "https://picsum.photos/200",
  });
  const [error, setError] = useState(null);
  //const feedRef = React.useRef(null);
  const [isPostAdded, setIsPostAdded] = useState(false);
  const children = { user, userProfile };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const { gsUser } = useAuth();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    //? init the app with data and store it in the state.
    const fetchSocialNetworkData = async () => {
      try {
        const response = await axios.get("/api/social-network/posts");
        setPosts(response.data.posts);
        const eloTop5 = await axios.get("/api/elo/top5");
        console.log("eloTop5", eloTop5);
        setTop5(eloTop5.data.eloRatings);
      } catch (err: any) {
        console.log(err);
        setError(err);
      }
    };
    fetchSocialNetworkData();
    console.log("socialNetwork", posts);
  }, []); // Empty dependency array ensures this runs only once on component mount

  /*
  const scrollToFeed = () => {
   if (feedRef.current) {
       const rect = feedRef.current.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset - 100,
        behavior: "smooth",
      }); 
    }
  };/*
  /* useEffect(() => {
    if (isPostAdded) {
      scrollToFeed();
      setIsPostAdded(false);
    }
  }, [isPostAdded]);
*/
  //user?.userProfile?.profilePicture = "https://picsum.photos/200";

  //if (error) return <ErrorHandling err={error} />;
  //if (socialNetwork === null) return <div>Loading...</div>;

  return (
    <div>
      <div className="">
        <div onClick={closeModal}>
          <Box>
            <div className="p-5 " style={{ marginTop: "0px" }}>
              <Grid templateColumns="1fr 3fr 1fr" gap={5}>
                {/* Profile column */}
                <Grid className="md:order-2 lg:order-1">
                  <MiniProfileLayout>{children}</MiniProfileLayout>
                  {/* Players online */}
                  {/* <PlayersOnline />
                  <OngoingLiveGames />
                  <JoinableGames /> */}
                </Grid>
                {/* Posts column */}
                <Grid className="md:order-3 lg:order-2 flex flex-col">
                  <div
                    className=" p-5 rounded-lg shadow-md  mb-5"
                    style={{ backgroundColor: "#fff" }}
                  >
                    {/*  <PostForm */}
                    <PostForm
                      handleSetPosts={(newPost: Post) => {
                        const tempPosts: Post[] = [...posts, newPost];
                        setPosts(Array.from(tempPosts));
                      }}
                    />
                  </div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    People you may know:
                  </label>
                  {/*  <FriendSuggestions
                    initialFriendSuggestions={friendSuggestions} 
                              /> */}
                  <FriendSuggestions />
                  <hr className="mt-5" />

                  <div
                    //ref={feedRef}
                    className="p-0 xl:col-span-2 mt-3 socialfeed "
                  >
                    <div className="grid grid-cols-1 cols-span-2 lg:grid-cols-1 gap-4  mt-5">
                      {<PostFeed thePosts={posts} />}
                    </div>
                  </div>
                </Grid>

                {/* Right column */}
                <Grid className="md:order-1 lg:order-3">
                  <div className=" p-0  mb-5 md:flex md:flex-row md:justify-around md:items-start lg:flex lg:flex-col lg:justify-between lg:items-end md:gap-5">
                    <div className="p-0  rounded-lg w-full">
                      <div className="bg-white rounded-lg p-5 shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 ">
                          Top 5 Ranking Players
                        </h2>
                        <ul className="pt-2 flex flex-col items-between">
                          {top5.map((player: any, index: number) => (
                            <Link
                              key={index}
                              href={`/social-network/profile/${player._id}`}
                            >
                              <li className="flex items-start justify-between mt-5 mb-4 p-2 hover:bg-slate-100 hover:cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-semibold text-gray-800 mr-3">
                                    1.
                                  </span>
                                  <Avatar
                                    src={player?.profilePicture || ""}
                                    name={player?.username}
                                  />
                                  <div className="ml-5">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                      {player?.username && (
                                        <span>
                                          {player.username.slice(0, 10)}
                                        </span>
                                      )}
                                    </h3>
                                    <p className="text-gray-600">
                                      Rank: {index}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-xl font-semibold text-gray-800 text-right">
                                  {player?.eloData?.rating} Points
                                </span>
                              </li>
                              <hr />
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-8 md:pt-5 rounded-lg shadow-md w-full lg:mt-5 md:mt-0 mb-5">
                      <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Latest Gameplay
                        </h2>

                        <p className="text-gray-600 mb-4">
                          Check out our most recent chess game:
                        </p>

                        <div className="flex flex-col bg-gray-100 p-2 rounded-md mb-4">
                          <div className="text-lg font-semibold text-gray-800 mr-5">
                            Time Elapsed:{" "}
                            <span className="text-blue-500">2:35:17</span>
                          </div>
                          <div className="text-lg  font-semibold text-gray-800">
                            Victor:{" "}
                            <span className="text-green-500">PlayerA</span>
                          </div>
                        </div>
                        <div className="lg:flex md:hidden">
                          <Chessboard
                            position="3b1q1q/1N2PRQ1/rR3KBr/B4PP1/2Pk1r1b/1P2P1N1/2P2P2/8 b - -"
                            boardWidth={320}
                          />
                        </div>
                        {/* Insert your latest chessboard component here */}
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* ... (modal code) 
                <ChessGameModal />*/}
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
