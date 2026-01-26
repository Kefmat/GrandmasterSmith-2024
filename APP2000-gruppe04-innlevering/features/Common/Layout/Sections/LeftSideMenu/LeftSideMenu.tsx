import React, { useState, useEffect } from "react";

import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";

import { Card } from "@nextui-org/react";

import AddOpeningComponent from "@/features/OpeningMovesPractice/Components/AddOpening";
import { Casino, Menu, Person } from "@mui/icons-material";
import Text from "@/features/Common/Components/Text/text";
import styles from "../../Styles/Sidebar.module.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useAuth } from "@/providers/AuthContext";
import moment from "moment";
import { Avatar } from "@nextui-org/react";
import { Link } from "@mui/material";
import { Icon } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { PersonAdd } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import acceptRequest from "@/features/SocialNetwork/Services/acceptRequest";
import deleteRequest from "@/features/SocialNetwork/Services/deleteRequest";
import { Chat } from "@mui/icons-material";
export interface TitleAndChessBoardAndAddFenLayoutType {
  boardWidth: number;
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleClearFen: () => void;
  fen: string;
}
export interface TitleAndChessBoardAndAddFenLayoutDataType {
  data: TitleAndChessBoardAndAddFenLayoutType;
}

/**
 * @description Samlings layout for å velge åpning og legge til ny åpning,
 * samt kontrollpanel for valgte åpning.
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <PickOpeningSection />
 * @version 1.0 2024-23-03
 */

const LeftSideMenuLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { gsUser } = useAuth();
  const toggleSideMenu = () => setIsExpanded(!isExpanded);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const deleteFriendRequest = (req: string) => {
    deleteRequest(req, setFriendRequests, friendRequests);
  };
  const acceptFriendRequest = (req: string) => {
    acceptRequest(req, friendRequests, setFriendRequests);
  };

  useEffect(() => {
    setFriendRequests(gsUser?.friendRequests);
  }, [gsUser]);

  const displayPopover = () => {
    //display a popover
  };

  return (
    <div className=" z-20 ">
      <div className="flex flex-row gap-0 justify-end">
        <Card
          className={`fixed top-1/3 left-0  z-50 flex flex-col justify-center  rounded-none bg-dark text-secondary`}
        >
          <div className="flex flex-col items-center justify-start  gap-4 p-2 text-secondary bg-dark ">
            <IconWithGlow icon={<Menu fontSize="large" />} />
            <div className="relative">
              <IconsWithPopovers
                icon={<Person fontSize="large" />}
                component={
                  <FriendRequestPopoverContent
                    onDelete={(req: string) => deleteFriendRequest(req)}
                    onAccept={(req: string) => acceptFriendRequest(req)}
                    friendRequests={friendRequests}
                  />
                }
              />
            </div>

            <IconWithGlow icon={<Chat />} />
            <IconWithGlow icon={<Casino fontSize="large" />} />

            {/* Add more icons as needed */}
          </div>
        </Card>
      </div>
    </div>
  );
};

const FriendRequestPopoverContent = ({
  onDelete,
  onAccept,
  friendRequests,
}: any) => {
  return friendRequests?.map((request: any) => (
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
            <Avatar name={request.user.username} src={request.user.picture} />
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
            <PersonAddIcon className="text-secondary" fontSize="small" />
          </div>
          <div
            onClick={() => onDelete(request._id)}
            className="text-secondary bg-error  w-7 h-7 flex items-center justify-center rounded-md hover:cursor-pointer"
          >
            <DeleteForever className="text-secondary" fontSize="small" />
          </div>
        </div>
      </div>
    </div>
  ));
};

const IconWithGlow = ({ icon }: any) => (
  <div
    className={` p-2 hover:bg-success transition-all ease-in duration-75 cursor-pointer`}
  >
    {icon}
  </div>
);

const IconsWithPopovers = ({ icon, component }: any) => {
  const GlowingIcon = IconWithGlow({ icon });
  return (
    <Popover placement="right">
      <PopoverTrigger>{GlowingIcon}</PopoverTrigger>

      <PopoverContent className=" p-5">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Friend Requests</PopoverHeader>

        <PopoverBody> {component} </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default LeftSideMenuLayout;

/*
{isExpanded ? (
            <>
              <div className="text-secondary" style={{ fontSize: "20px" }}>
                <MenuOpen
                  fontSize="large"
                  style={{ cursor: "pointer" }}
                  onClick={toggleSideMenu}
                />
              </div>
              <Text
                variant="h2"
                size="xl"
                color="secondary"
                className="text-center"
              >
                Select opening <Info onClick={displayPopover} />
              </Text>
            </>
          ) 

          */
