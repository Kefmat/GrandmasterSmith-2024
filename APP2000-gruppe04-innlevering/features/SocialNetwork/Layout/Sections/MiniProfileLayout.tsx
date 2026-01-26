import Link from "next/link";
import { Button, Avatar } from "@nextui-org/react";
import FeedIcon from "@mui/icons-material/Feed";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteForever from "@mui/icons-material/DeleteForever";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/providers/AuthContext";
import getServer, { getMediaServerDownload } from "@/getServer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button as ChakraButton,
} from "@chakra-ui/react";
import moment from "moment";
import Text from "@/features/Common/Components/Text/text";
import acceptRequest from "../../Services/acceptRequest";
import deleteRequest from "../../Services/deleteRequest";

function FriendRequestPopover({ friendRequests, onDelete, onAccept }: any) {
  return (
    <PopoverContent boxSize="max-content">
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Friend Requests</PopoverHeader>
      <PopoverBody>
        {friendRequests.length > 0 ? (
          friendRequests.map((request: any) => (
            <div
              key={request._id}
              className="flex flex-col gap-2 hover:bg-blue-100 p-3"
            >
              <div className="flex flex-row gap-4 items-center">
                <Link
                  href={`/social-network/profile/${request.user._id}`}
                  className="hover:cursor-pointer "
                >
                  <div className="flex flex-row items-center gap-2">
                    {" "}
                    <Avatar
                      name={request.user.username}
                      src={request.user.picture}
                    />
                    <div className="flex flex-col justify-start items-start gap-1">
                      <Text variant="body3" size="lg">
                        {request.user.username} wants to be your friend!
                      </Text>
                      <Text variant="body3" size="sm">
                        {moment(request.created_at).fromNow()}
                      </Text>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-row gap-2">
                  <div
                    onClick={() => onAccept(request._id)}
                    className="text-secondary bg-success  w-7 h-7 flex items-center justify-center rounded-md hover:cursor-pointer"
                  >
                    <PersonAddIcon
                      className="text-secondary"
                      fontSize="small"
                    />
                  </div>
                  <div
                    onClick={() => onDelete(request._id)}
                    className="text-secondary bg-error  w-7 h-7 flex items-center justify-center rounded-md hover:cursor-pointer"
                  >
                    <DeleteForever
                      className="text-secondary"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No friend requests at the moment.</div>
        )}
      </PopoverBody>
    </PopoverContent>
  );
}

/**
 * @description MiniProfileLayout er et layout for å vise en mini profil, med friend requests, og mulighet for å akseptere eller avslå disse.
 * @author  Borgar Flaen Stensrud
 *
 */

const MiniProfileLayout = ({ children }: any) => {
  const { user, userProfile } = children;
  const { gsUser } = useAuth();
  const [profilePicture, setProfilePicture] = React.useState("");
  const [friendRequests, setFriendRequests] = React.useState<any[]>([]);

  const acceptFriendRequest = async (request: any) => {
    acceptRequest(request, friendRequests, setFriendRequests);
  };

  const deleteFriendRequest = async (request: any) => {
    deleteRequest(request, setFriendRequests, friendRequests);
  };

  console.log("gsUser", gsUser);
  useEffect(() => {
    if (gsUser?.user.picture) {
      setProfilePicture(gsUser.user.picture);
      return;
    }
    const fetchUserPhoto = async () => {
      if (gsUser?.username === undefined) return;
      try {
        const response = await axios.get(
          `${getMediaServerDownload()}/profile_photo`
        );

        setProfilePicture(response?.data?.url);
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };
    fetchUserPhoto();
  }, [gsUser]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await axios.get(
        "/api/social-network/friend_notifications"
      );
      setFriendRequests(result.data.friendRequests);
    };
    fetchNotifications();
  }, [gsUser]);

  return (
    <div className="post p-0 lg:p-0  rounded-md">
      <div className="">
        <div className="bg-white p-0 rounded-lg shadow-md max-w-md  mb-4">
          <div className="relative">
            <img
              src={profilePicture ? profilePicture : ""}
              alt="Banner Profile"
              className="w-full h-32 object-contain bg-dark rounded-t-lg"
            />
            <img
              src={profilePicture ? profilePicture : ""}
              alt="Profile Picture"
              className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="p-5 mt-5">
            <div className="flex items-center mt-4">
              <h2 className="text-xl font-bold text-gray-800">
                {gsUser?.user.name && gsUser?.user.name
                  ? gsUser?.user.name
                  : gsUser?.username}
              </h2>
            </div>

            <p className="text-gray-700 mt-2 mb-4">
              {" "}
              Web Developer | Cat Lover | Coffee Enthusiast{" "}
            </p>
            <Link href="/users/edit-profile">
              <Button className="mt-2 mb-2" color="primary">
                Edit profile
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-5 mt-5 space-x-4 text-center">
              <div className="flex flex-col justify-center items-center ">
                <FeedIcon className="text-gray-700" fontSize="large" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <ChatIcon className="text-gray-700" fontSize="large" />
              </div>
              <div className="flex flex-col justify-center items-center relative">
                <Popover placement="top">
                  <PopoverTrigger>
                    <div className="cursor-pointer">
                      <PersonAddIcon
                        className="text-gray-700"
                        fontSize="large"
                      />
                      {friendRequests && friendRequests.length > 0 && (
                        <div className="absolute top-0 right--0 translate-x-4 -translate-y-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {friendRequests.length}
                        </div>
                      )}
                    </div>
                  </PopoverTrigger>
                  <FriendRequestPopover
                    onDelete={(req: string) => deleteFriendRequest(req)}
                    onAccept={(req: string) => acceptFriendRequest(req)}
                    friendRequests={friendRequests}
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MiniProfileLayout;
