import axios from "axios";

/**
 * @description slett venneforespørsel
 * @author  Borgar Flaen Stensrud
 *
 */

const deleteRequest = async (
  request: any,
  setFriendRequests: (friend: any) => void,
  friendRequests: any[]
) => {
  try {
    const response = await axios.post(
      "/api/social-network/delete_friend_request",
      {
        friendRequestId: request._id,
      }
    );
    console.log("response", response);
    if (response.status === 200) {
      const tempRequests = friendRequests.filter((req) => req._id !== request);
      setFriendRequests(tempRequests);
    }
  } catch (error) {
    console.error("Error deleting friend request:", error);
  }
};
export default deleteRequest;
