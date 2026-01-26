import React from "react";
import { Button } from "@nextui-org/react";

/**
 * @description AddFriendLayout knapp for å legge til venn
 * @author  Borgar Flaen Stensrud
 *
 */

const AddFriendLayout = ({
  friendId,
  addFriend,
}: {
  friendId: string;
  addFriend: (friendId: string) => void;
}) => {
  return (
    <Button
      size="sm"
      variant="solid"
      style={{ backgroundColor: "dark", marginTop: "10px" }}
      onClick={() => {
        addFriend(friendId);
      }}
    >
      Add Friend
    </Button>
  );
};

export default AddFriendLayout;
