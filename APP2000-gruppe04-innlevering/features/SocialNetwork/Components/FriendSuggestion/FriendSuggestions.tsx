import { useEffect, useState } from "react";
import FriendSuggestion from "./FriendSuggestion";
import axios from "axios";
import { useAuth } from "@/providers/AuthContext";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Friend {
  id: string;
  username: string;
  elo: number;
}

/**
 * @description FriendSuggestion liste av venner foreslått av systemet som brukeren kan legge til.
 * @author  Borgar Flaen Stensrud
 *
 */

const FriendSuggestions = () => {
  //TODO: Add Friend Request Functionality, and add friend request to the database and API
  //TODO: Furter this component with creating a sub component FriendSuggestion, for each FriendSuggestion.
  const [friendSuggestions, setFriendSuggestions] = useState<Friend[]>([]);
  const { gsUser } = useAuth();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const fetchFriendSuggestions = async () => {
      if (!user) return console.error("No user found");
      try {
        const res = await axios.get("/api/social-network/friend_suggestions", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (!res?.data)
          return console.error("No data returned from friend suggestions");

        console.log("res", res);
        const tempFriendSuggestions: Friend[] =
          res?.data?.suggestions?.map((friend: any) => {
            return {
              id: friend._id,
              username: friend.username,
              elo: friend.elo.rating,
            } as Friend;
          }) || [];
        setFriendSuggestions(tempFriendSuggestions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriendSuggestions();
    console.log("Friend Suggestions", friendSuggestions);
  }, [user]);

  const removeFriendSuggestion = (id: string) => {
    setFriendSuggestions((prevSuggestions) =>
      prevSuggestions.filter((friend: Friend) => friend?.id !== id)
    );
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-row justify-start gap-2 mt-5">
      {friendSuggestions ? (
        friendSuggestions?.map((friend: Friend, index: number) => (
          <div
            key={index}
            className="p-0 rounded-lg shadow-md flex-col  bg-white"
          >
            <FriendSuggestion
              friendSuggestion={friend}
              removeFriendSuggestion={(id: any) => removeFriendSuggestion(id)}
            />
          </div>
        ))
      ) : (
        <p> No Friend Suggestions</p>
      )}
    </div>
  );
};

FriendSuggestions.defaultProps = {
  FriendSuggestions: [],
};

FriendSuggestions.propTypes = {
  friendSuggestions: [],
};

export default FriendSuggestions;
