import React, { useEffect } from "react";

import { useState } from "react";

import Text from "@/features/Common/Components/Text/text";
import {
  Divider,
  Slider,
  Input,
  Button,
  Spacer,
  Avatar,
  Tabs,
  Tab,
} from "@nextui-org/react";
import io from "socket.io-client";
import Swal from "sweetalert2";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Select,
  Stack,
  Checkbox,
} from "@chakra-ui/react";

import { useUser } from "@auth0/nextjs-auth0/client";
import mongoose from "mongoose";
import { Chessboard } from "react-chessboard";
import * as engine from "@/Chess/engine";
import { Square } from "@/Chess/engine";
import axios from "axios";
import CreateMatchLayout from "../Sections/CreateMatch";
import { LiveHelp } from "@mui/icons-material";
import RoomList from "../Sections/RoomList";

interface user {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  auth0id: string;
  elo: mongoose.Types.ObjectId;
  friends?: mongoose.Types.ObjectId[];
  team?: mongoose.Types.ObjectId[];
  role?: mongoose.Types.ObjectId[];
  __v: number;
}
interface player {
  socketId: mongoose.Types.ObjectId;
  player: user;
  role: string;
  color: string;
}
interface room {
  name: string;
  players: player[];
  spectators: [];
  bannedSpectators: [];
  active: boolean;
}

const Pvpgamemode = () => {
  const { user, isLoading } = useUser();
  const [roomName, setRoomName] = useState<string>("");
  const [rooms, setRooms] = useState<room[]>([]);
  const [usersOnline, setUsersOnline] = useState<any>([]);
  const [socket, setSocket] = useState<any | null>(null);
  const [fen, setFen] = useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameReady, setGameReady] = useState<boolean>(false);
  const [myRoom, setMyRoom] = useState<room | null>(null);
  const [color, setColor] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openNewMatchModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!isLoading && user?.sub && !socket) {
      const queryUser = {
        id: user.sub,
        picture: user.picture,
      };
      if (!queryUser || !queryUser.picture) return;
      const newSocket = io("https://grandmasters-smith.ew.r.appspot.com", {
        query: { userId: queryUser.id, picture: queryUser.picture },

        extraHeaders: {
          "Access-Control-Allow-Origin":
            "https://app-2000-gruppe04.vercel.app/",
        },
      });
      newSocket.on("connect", () => {
        console.log("Socket connected");
        newSocket.emit("request_rooms", (response: any) => {
          console.log("Requesting rooms:", response); // This will log if the server sends back a confirmation callback
        });

        newSocket.on("game_ready", (data: any) => {
          console.log("Game Ready", data);
          setGameReady(true);
        });
        newSocket.on("move_made", (data: any) => {
          setFen(data);
        });
        newSocket.on("my_room", (data: room) => {
          setMyRoom(data);
        });
        newSocket.on("rooms_updated", (rooms: room[]) => {
          setRooms(rooms);
          console.log("rooms", rooms);
        });
        newSocket.on("game_started", (data: any) => {
          setFen(data);
          setGameStarted(true);
        });
        newSocket.on("updateUserList", (users: any) => {
          console.log("users", users);
          setUsersOnline(users);
        });
        newSocket.on("invalid_move", (data: any) => {
          Swal.fire("Invalid Move", data.message, "error");
        });
        newSocket.on("error", (errorMsg: any) => {
          Swal.fire("Error", errorMsg, "error").then(() => {
            console.error(errorMsg);
          });
        });
      });

      setSocket(newSocket);
    }
  }, [user, isLoading, socket]);

  const createNewMatch = (
    roomName: string,
    elo: number[],
    friend: string | undefined
  ) => {
    if (!roomName) {
      return;
    }
    const eloMin = elo[0];
    const eloMax = elo[1];
    const player = {
      color: color,
      photo: user?.picture,
    };
    socket.emit("create", { roomName, eloMin, eloMax, player });
    setModalOpen(false);
    console.log("displaying the amount of rooms created");
    console.log("Pressed create room button");
  };

  const joinMatch = (id: any) => {
    if (!id) {
      return;
    }
    const player = {
      color: color,
      photo: user?.picture,
    };
    socket.emit("join", { id, player });
  };

  const leaveMatch = (id: any) => {
    if (!id) {
      return;
    }
    socket.emit("leave", { id });
    console.log("Pressed leave room button");
  };

  const startMatch = () => {
    socket.emit("start_game");
    console.log("Pressed start game button");
  };
  useEffect(() => {
    console.log("fen:", fen);
  }, [fen]);

  if (!user) return <div>Not logged in</div>;

  const move = async (
    sourceSquare: any,
    targetSquare: any
  ): Promise<boolean> => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
    };
    try {
      const newfen = await axios.post(
        "http://localhost:3001/api/chess/move",
        { fen: fen, from: sourceSquare, to: targetSquare },
        {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // if your API requires auth
          },
        }
      );

      if (!newfen) return false;
    } catch (error) {
      return false;
      console.error(error);
    }
    return true;
  };

  const makeMove = (sourceSquare: Square, targetSquare: Square) => {
    const newMove = {
      from: sourceSquare,
      to: targetSquare,
    };
    const isMoved = move(newMove.from, newMove.to);
    console.log("verifiedMove", isMoved);
    if (!isMoved) return false;
    socket.emit("move", { from: sourceSquare, to: targetSquare, fen });
    return true;
  };

  return (
    <>
      <CreateMatchLayout
        modalOpen={modalOpen}
        handleNewMatch={(
          matchName: string,
          elo: number[],
          friend: string | undefined
        ) => createNewMatch(matchName, elo, friend)}
        onClose={() => setModalOpen(false)}
      />

      {!gameStarted ? (
        !gameReady ? (
          <>
            <Container
              maxW="container.lg"
              className="flex flex-col justify-start mx-auto gap-4 pt-5"
            >
              <div className="flex flex-row justify-between w-96 items-center gap-4 bg-secondary text-primary rounded-md shadow-md  p-3">
                <Text
                  variant="h1"
                  size="xl"
                  color="primary"
                  className=""
                  alignment="left"
                >
                  PVP Matchmaking
                </Text>
                <Button
                  color="success"
                  className="text-white w-100"
                  onClick={openNewMatchModal}
                >
                  Create new match
                </Button>
              </div>
              <div className="flex flex-row gap-3  ">
                <Card className="">
                  <CardBody className="flex flex-row flex-wrap justify-start gap-5">
                    <div className="w-1/4 px-3 flex flex-col gap-4">
                      <div className="flex flex-row justify-between gap-2">
                        <Slider
                          label="Elo Range"
                          step={50}
                          minValue={0}
                          maxValue={2500}
                          defaultValue={[0, 2500]}
                          className="max-w-md"
                          color="success"
                        />
                      </div>
                      <Text variant="h3" size="sm">
                        <LiveHelp /> This is the range of ELO you want to play
                        against.
                      </Text>
                    </div>

                    <div className="w-1/4 px-3 flex flex-col gap-4">
                      <Stack
                        spacing={5}
                        direction="row"
                        className="flex flex-row justify-start gap-5"
                      >
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          White
                        </Checkbox>
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          Black
                        </Checkbox>
                      </Stack>
                      <Text variant="h3" size="sm">
                        <LiveHelp /> This is the color you would like to play
                        as, selecting both gives more matches!
                      </Text>
                    </div>
                    <div className="w-1/4 px-3 flex flex-col gap-4">
                      <Stack
                        spacing={5}
                        direction="row"
                        className="flex flex-row justify-start gap-5"
                      >
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          Classic Chess
                        </Checkbox>
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          Bullet Chess
                        </Checkbox>
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          Lightning Chess
                        </Checkbox>
                        <Checkbox colorScheme="blue" size="lg" defaultChecked>
                          Rapid Chess
                        </Checkbox>
                      </Stack>
                      <Text variant="h3" size="sm">
                        <LiveHelp /> Filter Game modes, check all to find more
                        matches!
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="__rooms flex flex-row flex-wrap gap-4 justify-start">
                <RoomList
                  rooms={rooms}
                  user={user}
                  joinMatch={joinMatch}
                  leaveMatch={leaveMatch}
                />
              </div>
            </Container>
          </>
        ) : (
          <Container
            maxW="container.lg"
            className="flex flex-col justify-start mx-auto gap-4 pt-5"
          >
            <Button color="success" onClick={() => startMatch()}>
              Start Game
            </Button>
          </Container>
        )
      ) : (
        <div className="py-10">
          <Chessboard
            position={fen}
            onPieceDrop={(sourceSquare, targetSquare) =>
              makeMove(sourceSquare, targetSquare)
            }
            boardWidth={500}
          />
        </div>
      )}
    </>
  );
};

export default Pvpgamemode;
