import axios from "axios";

/**
 * @description Godta venneforespørsel
 * @author  Borgar Flaen Stensrud
 *
 */

const acceptRequest = async (
  request: any,
  friendRequests: any[],
  setFriendRequests: (friend: any) => void
) => {
  try {
    const response = await axios.post(
      "/api/social-network/accept_friend_request",
      {
        friendRequestId: request,
      }
    );
    console.log("response", response);
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
  const tempRequests = friendRequests.filter((req) => req._id !== request);
  setFriendRequests(tempRequests);
};
export default acceptRequest;
