import { Edit } from "@mui/icons-material";
import { Image } from "@nextui-org/react";
import ProfileImageEditor from "../Components/ProfileImageEditor";

import { Button as NextButton, Card } from "@nextui-org/react";
import TabsProfile from "../Sections/tabs/UserProfileTabs";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  FocusLock,
  Container,
  Box,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "@/providers/AuthContext";

const ProfileHeader = ({ user }: any) => {
  const { gsUser } = useAuth();

  if (!gsUser) return null;
  return (
    <div className="">
      {/* Profile column */}
      <div className="">
        <div className="post p-0 lg:p-0  rounded-md">
          <div className="">
            <div className="bg-white p-0 rounded-lg shadow-md  mb-4">
              <div className="relative">
                <div className="rounded-t-lg rounded-b-none">
                  <Image
                    src={
                      user?.profilePicture
                        ? user?.profilePicture
                        : gsUser?.user?.picture
                    }
                    alt="Banner Profile"
                    width={"100%"}
                    className="w-full rounded-none h-32 object-contain bg-dark"
                  />
                </div>
                <div className="absolute bottom-0 left-9 transform  translate-y-1/3 w-24 h-24 rounded-full border-4  border-dark z-50">
                  <ProfileImageEditor
                    picture={
                      user?.profilePicture
                        ? user.profilePicture
                        : gsUser.user.picture
                    }
                  />
                </div>
              </div>
              <div className="mt-5 mb-5">{""}</div>
              <div className="px-5 pt-5 mt-5 mx-5">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col ">
                    <div className="flex items-center mt-4">
                      <h2 className="text-xl font-bold text-gray-800">
                        {user?.username
                          ? user.username
                          : gsUser?.user?.name && gsUser?.user?.name}
                      </h2>
                    </div>

                    <p className="text-gray-700 mt-2 mb-2">
                      {" "}
                      Web Developer | Cat Lover | Coffee Enthusiast{" "}
                    </p>
                  </div>
                  <div>
                    {user?.username ? (
                      user?.friends?.includes(gsUser._id) ? (
                        <NextButton
                          size="sm"
                          className="mt-2 mb-5 "
                          color="primary"
                        >
                          Friend request pending...
                        </NextButton>
                      ) : (
                        <NextButton
                          size="sm"
                          className="mt-2 mb-5 "
                          color="primary"
                        >
                          <PersonAddIcon /> Add friend
                        </NextButton>
                      )
                    ) : (
                      <NextButton
                        size="sm"
                        className="mt-2 mb-5 "
                        color="primary"
                      >
                        <Edit /> Edit profile
                      </NextButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
