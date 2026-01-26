import Text from "@/features/Common/Components/Text/text";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Card,
  Select,
} from "@chakra-ui/react";
import { PersonAddAlt1 } from "@mui/icons-material";
import { Input, Slider, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";

const CreateMatchLayout = ({ handleNewMatch, modalOpen, onClose }: any) => {
  const [roomName, setRoomName] = useState<string>("");
  const [elo, setElo] = useState<number[]>([100, 500]);
  const [friend, setFriend] = useState<string>("");
  const { gsUser } = useAuth();
  if (gsUser) console.log(gsUser.friendsData);
  useEffect(() => {
    if (!modalOpen) {
      onClose();
    }
  }, []);

  const onCreateNewMatch = () => {
    if (friend === "") {
      handleNewMatch(roomName, elo);
    } else {
      handleNewMatch(roomName, elo, friend);
    }
  };
  return (
    <>
      <Drawer placement="top" onClose={onClose} isOpen={modalOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            className="flex flex-col gap-2 justify-center items-center"
          >
            Create new match!
          </DrawerHeader>
          <DrawerBody className="flex flex-col  justify-center items-center bg-gray-200 p-5">
            <Card className="p-4 flex flex-col gap-4 ">
              <div className="w-80 flex flex-col gap-2">
                <Text variant="h3" size="xl">
                  Name of match:
                </Text>
                <Input
                  placeholder="NAME OF MATCH"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                ></Input>
              </div>
              <hr />
              <div className="py-2 w-80 flex flex-col gap-2">
                <Text variant="h3" size="xl">
                  Select allowed elo range of oponent:
                </Text>
                <Slider
                  label="Elo Range"
                  step={50}
                  minValue={0}
                  maxValue={1000}
                  defaultValue={[100, 500]}
                  className="max-w-md"
                />
              </div>
              <hr />
              <div className="py-2 w-80 flex flex-col gap-2 items-center">
                <Text variant="h3" color="success" size="md">
                  Optional: Invite a player, or skip to continue to matchmaking!
                </Text>

                <Select
                  variant="outline"
                  placeholder="Select User to invite"
                  onChange={(e) => setFriend(e.target.value)}
                >
                  {gsUser?.friends?.map((friend: any) => (
                    <option key={friend._id} value={friend._id}>
                      {friend.username}
                    </option>
                  ))}
                </Select>
              </div>
              <hr />
              <div className="flex flex-row gap-2 mt-4 justify-between">
                <Button
                  color="danger"
                  className="text-secondary  w-full"
                  onClick={() => onClose()}
                >
                  Cancle
                </Button>
                <Button
                  color="success"
                  className="text-secondary w-full"
                  onClick={() => onCreateNewMatch()}
                >
                  Create Match
                </Button>
              </div>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateMatchLayout;
