import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Avatar,
  Divider,
} from "@chakra-ui/react"; // Ensure you import these from your actual UI library

const RoomList = ({ rooms, user, joinMatch, leaveMatch }: any) => {
  return (
    <>
      {Array.isArray(rooms) &&
        rooms.map((room, index) => {
          const isUserInRoom = room.players.some(
            (player: any) => player?.player?.auth0id === user?.sub
          );
          const roomFull = room.players.length === 2;

          return (
            <Card className="" key={index}>
              <CardHeader>
                <Text
                  variant="h3"
                  size="lg"
                  color="primary"
                  className="text-center"
                >
                  {room?.name}
                </Text>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col gap-4">
                <Text>
                  <strong>Players:</strong> {room?.players?.length}
                </Text>
                <Text>
                  <strong>Room Name:</strong> {room.name}
                </Text>
                <div className="flex flex-row justify-between gap-4">
                  {room?.players.map((player: any, index: number) => (
                    <div key={index} className="flex flex-row gap-2">
                      <Avatar
                        src={player.player?.photo}
                        name={player.player?.username}
                      />
                      <div className="flex flex-col gap-2">
                        <Text>{player?.player?.username}</Text>
                        <Text>ELO: {player.elo?.rating || 0}</Text>
                      </div>
                    </div>
                  ))}
                </div>
                <Text>
                  <strong>
                    Elo-Range: {room?.eloMin} - {room?.eloMax}
                  </strong>
                </Text>
              </CardBody>
              <Divider />
              <CardFooter className="relative" style={{ height: "100px" }}>
                <div
                  className="absolute h-full w-full top-0 left-0 bg-cover bg-opacity- bg-no-repeat p-5 flex flex-row justify-between"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "50% 55%",
                    backgroundImage: "url('/images/chess/chesstourney.png')",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backgroundBlendMode: "overlay",
                  }}
                >
                  {!isUserInRoom && !roomFull && (
                    <Button
                      color="purple"
                      variant="solid"
                      onClick={() => joinMatch(room._id)}
                      className="shadow-medium border-2 text-secondary border-primary"
                    >
                      Join Match
                    </Button>
                  )}
                  {isUserInRoom && (
                    <Button
                      color="danger"
                      onClick={() => leaveMatch(room._id)}
                      className="shadow-medium border-2 border-primary"
                    >
                      Leave Match
                    </Button>
                  )}
                  {roomFull && !isUserInRoom && (
                    <Button
                      color="primary"
                      className="shadow-medium border-2 border-blue-500"
                    >
                      Spectate
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
    </>
  );
};

export default RoomList;
