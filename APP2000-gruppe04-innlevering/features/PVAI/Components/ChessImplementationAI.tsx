import { useState, useEffect, useCallback } from "react";
import { Chessboard } from "react-chessboard";

import ChessGameAi from "../Services/ChessGameAI";
import Swal from "sweetalert2";
import * as engine from "@/Chess/engine";
import { BoardMove, SelectedBot } from "@/Chess/BotTestApp";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { AvailableBots, UninitialisedBot } from "@/Chess/bots";
import { useGame } from "@/providers/GameContext";
import ChessGameAI from "../Services/ChessGameAI";
import { useAuth } from "@/providers/AuthContext";
import { Chess } from "chess.js";
import formatTime from "@/features/Common/Utils/formatTime";
import { useOpenings } from "@/providers/OpeningsContext";
import { PlayerEnemyDataAndTitleAI } from "@/features/OpeningMovesPractice/Layout/Component/Turn/PlayerEnemyDataComponent";
/**
 * @description ChessBoardImplementationAI er et komponent som viser et sjakkbrett med mulighet for å spille mot AI.
 * @author Abdallah Amidu Ndikumana & Borgar Flaen Stensrud
 
 * @example <ChessboardWithAI ai={selectedAI}  />
 *
 * bruker uciWorker og randomMove for å lage AI
 * worker bruker en web assembly for å kjøre stockfish.js
 * randomMove velger et tilfeldig trekk
 * @version 1.0 2024-23-03
 *
 */

export const randomMove: UninitialisedBot = () => (fen) =>
  new Promise((resolve) => {
    const chess = new Chess();
    chess.load(fen);
    const moves = chess.moves({ verbose: true });
    const { from, to } = moves[Math.floor(Math.random() * moves.length)];
    setTimeout(() => resolve({ from, to }), 500);
  });

export const uciWorker =
  (file: string, actions: Array<string>): UninitialisedBot =>
  () => {
    const worker = new Worker(file);

    let resolver: ((move: any) => void) | null = null;

    worker.addEventListener("message", (e) => {
      const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
      if (move && resolver) {
        resolver({ from: move[1], to: move[2] });
        resolver = null;
      }
    });

    return (fen: engine.Fen) =>
      new Promise((resolve, reject) => {
        if (resolver) {
          reject("Pending move is present");
          return;
        }

        resolver = resolve;
        worker.postMessage(`position fen ${fen}`);
        actions.forEach((action) => worker.postMessage(action));
      });
  };

export const Bots: AvailableBots = {
  Random: randomMove,
  "Stockfish (skill-level:1, depth:10)": uciWorker(
    "/bots/stockfish.js-10.0.2/stockfish.js",
    ["setoption name Skill Level value 1", "go depth 10"]
  ),
  "Stockfish (skill-level:20, depth:10)": uciWorker(
    "/bots/stockfish.js-10.0.2/stockfish.js",
    ["setoption name Skill Level value 20", "go depth 10"]
  ),
  "Stockfish (skill-level:20, time:1s)": uciWorker(
    "/bots/stockfish.js-10.0.2/stockfish.js",
    ["setoption name Skill Level value 20", "go movetime 1000"]
  ),
  "Lozza (skill-level:1, depth:10)": uciWorker("/bots/lozza-1.18/lozza.js", [
    "setoption name Skill Level value 1",
    "go depth 10",
  ]),
  "Lozza (skill-level:20, depth:10)": uciWorker("/bots/lozza-1.18/lozza.js", [
    "setoption name Skill Level value 20",
    "go depth 10",
  ]),
  "Lozza (skill-level:20, time:1s)": uciWorker("/bots/lozza-1.18/lozza.js", [
    "setoption name Skill Level value 20",
    "go movetime 1000",
  ]),
};

export const ChessboardWithAI = ({ ai }: any) => {
  const [aiGame, setAiGame] = useState<ChessGameAi | null>(null);
  const [fen, setFen] = useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const boardWidth = 500;
  const [playing, setPlaying] = useState<boolean>(false);
  const [history, setHistory] = useState<(string | engine.Move)[]>([]);
  const [whiteBot, setWhiteBot] = useState<SelectedBot>(null);
  const [blackBot, setBlackBot] = useState<SelectedBot>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [player, setPlayer] = useState<any>({});
  const [enemy, setEnemy] = useState<any>({});

  const { game, playerColor, setPlayerColor } = useGame();
  const { gsUser } = useAuth();

  const handleTime = useCallback(() => {
    const pcolor = playerColor === "white" ? "w" : "b";
    const ecolor = playerColor === "white" ? "b" : "w";
    const tempPlayer = {
      name: gsUser?.username,
      totalTimeLeft: formatTime(aiGame?.getClock()?.getTimeLeft(pcolor) ?? 0), // Total time left for the game
      turnTime: formatTime(aiGame?.getClock()?.getTurnTime(pcolor) ?? 0), // Time left for the current turn
      enemy: false,
      color: pcolor,
    };
    const tempEnemy = {
      name: ai.name,
      totalTimeLeft: formatTime(aiGame?.getClock()?.getTimeLeft(ecolor) ?? 0), // Total time left for the game
      turnTime: formatTime(aiGame?.getClock()?.getTurnTime(ecolor) ?? 0), // Time left for the current turn
      enemy: true,
      color: ecolor,
    };
    setPlayer(tempPlayer);
    setEnemy(tempEnemy);
    setLoading(false);
  }, [aiGame, fen]);

  const handleIsGameOver = useCallback(() => {
    if (engine.isGameOver(fen)) {
      const winner = engine.getGameWinner(fen);
      if (winner) {
        Swal.fire({
          title: "Game Over",
          text: "Game Over, winner is " + winner === "w" ? "White" : "Black",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    }
  }, [fen]);

  const newGame = useCallback(() => {
    if (!gsUser) return;

    const tempAIGame: ChessGameAI = game as ChessGameAI;
    setPlaying(false);
    setFen(engine.newGame);
    setHistory([]);

    let white;
    let black;
    playerColor === "white" ? (white = gsUser._id) : (white = "ai");
    playerColor === "black" ? (black = gsUser._id) : (black = "ai");

    const users = {
      w: white,
      b: black,
    };

    if (gsUser._id) tempAIGame?.setUser(gsUser._id);
    tempAIGame?.startGame(handleTime, handleIsGameOver, users);
    playerColor === "black" ? setWhiteBot(ai) : setBlackBot(ai);

    setAiGame(tempAIGame);
    setPlaying(true);
  }, []);

  useEffect(() => {
    newGame();
  }, []);

  const onGameCompleted = useCallback((winner: string) => {
    Swal.fire({
      title: "Game Over",
      text: `Game Over, winner is " ${winner === "w" ? "White" : "Black"} `,
      icon: "success",
      confirmButtonText: "Cool",
    });
  }, []);

  const doMove = useCallback(
    (fen: engine.Fen, from: engine.Square, to: engine.Square) => {
      setPlaying(true);
      let move;
      try {
        move = engine.move(fen, from, to);
      } catch (e) {
        console.log(e);
        return false;
      }
      if (!move) {
        return false;
      }

      const [newFen, action] = move;

      if (
        engine.isGameOver(newFen) ||
        engine.isCheckmate(newFen) ||
        engine.availableMoves(newFen) === 0
      ) {
        onGameCompleted(engine.getGameWinner(newFen) || "no winner");
        newGame();
        return false;
      }

      setFen(newFen);
      setHistory((history) => [...history, action]);
      return true;
    },
    []
  );

  const onDragStart = ({
    sourceSquare: from,
  }: Pick<BoardMove, "sourceSquare">) => {
    const isWhiteBotTurn = whiteBot && engine.isWhiteTurn(fen);
    const isBlackBotTurn = blackBot && engine.isBlackTurn(fen);

    return (
      playing &&
      engine.isMoveable(fen, from) &&
      !(isWhiteBotTurn || isBlackBotTurn)
    );
  };

  const onMovePiece = ({
    sourceSquare: from,
    targetSquare: to,
  }: BoardMove): boolean => {
    doMove(fen, from, to);
    return true;
  };

  useEffect(() => {
    if (!playing || !player || !enemy) {
      return;
    }

    let isBotMovePlayable = true;

    if (whiteBot && engine.isWhiteTurn(fen)) {
      whiteBot.move(fen).then(({ from, to }: any) => {
        if (isBotMovePlayable) doMove(fen, from, to);
      });
    }

    if (blackBot && engine.isBlackTurn(fen)) {
      blackBot.move(fen).then(({ from, to }: any) => {
        if (isBotMovePlayable) doMove(fen, from, to);
      });
    }

    return () => {
      isBotMovePlayable = false;
    };
  }, [enemy, doMove, fen, player, whiteBot, blackBot, playing]);
  if (loading || !playerColor) return <div>Loading...</div>;
  console.log("player", playerColor);
  return (
    <div className="flex flex-row gap-5 justify-between">
      <Chessboard
        boardOrientation={playerColor as BoardOrientation}
        position={fen}
        onPieceDragBegin={(piece, sourceSquare) =>
          onDragStart({ sourceSquare })
        }
        onPieceDrop={(sourceSquare, targetSquare, piece) =>
          onMovePiece({ sourceSquare, targetSquare })
        }
        boardWidth={500}
      />
      {player && enemy && (
        <PlayerEnemyDataAndTitleAI
          player={player}
          enemy={enemy}
          game={aiGame}
          move={aiGame?.getCurrentMove()}
          timeUpdate={handleTime}
        />
      )}
    </div>
  );
};
