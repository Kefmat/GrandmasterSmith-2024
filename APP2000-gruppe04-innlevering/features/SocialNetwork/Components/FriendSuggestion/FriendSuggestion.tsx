import React from "react";
import AddFriend from "./AddFriend";
import propTypes from "prop-types";
import { Friend } from "./FriendSuggestions";
import axios from "axios";
import Swal from "sweetalert2";

/**
 * @description FriendSuggestion venner foreslått av systemet som brukeren kan legge til.
 * @author  Borgar Flaen Stensrud
 *
 */

const FriendSuggestion = ({
  friendSuggestion,
  removeFriendSuggestion,
}: any) => {
  console.log("FriendSuggestion", friendSuggestion);

  const addFriend = async (friendId: string) => {
    console.log("Add friend", friendId);
    await axios
      .post("/api/social-network/add_friend", {
        friendId,
      })
      .then((res) => {
        Swal.fire({
          title: "Friend request sent!",
          icon: "success",
        });
        removeFriendSuggestion(friendId);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error adding friend",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex flex-col justify-between">
      {/*<div className="flex justify-center rounded-t-lg mt-1 mx-1 overflow-hidden">
        <img
          src={friend.userProfile.profilePicture}
          alt={`User: ${friend.username}`}
          className="self-center "
          style={{ maxHeight: "150px", width: "auto", maxWidth: "150px" }}
  />
      </div>*/}
      <div className="p-4">
        <div className="text-lg font-bold text-gray-800">
          {friendSuggestion && friendSuggestion?.username}
        </div>
        <div className="text-sm text-gray-600">
          <b>Elo:</b> {friendSuggestion?.elo}
        </div>
        <div className="text-sm text-gray-600 mt-2 flex-grow">
          10 Friends in Common
        </div>
        <AddFriend
          friendId={friendSuggestion?.id}
          addFriend={(id: string) => addFriend(id)}
        />
      </div>
    </div>
  );
};

export default FriendSuggestion;
