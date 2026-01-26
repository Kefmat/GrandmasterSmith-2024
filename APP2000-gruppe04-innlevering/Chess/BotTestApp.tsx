import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
import { Chessboard } from "react-chessboard";
import * as engine from "./engine";
import type { AvailableBots, InitialisedBot } from "@/Chess/bots";
import styles from "./styles.module.scss";
import { Card } from "@chakra-ui/react";
import Text from "@/features/Common/Components/Text/text";

export type SelectedBot = {
  name: string;
  move: InitialisedBot;
} | null;

export type BoardMove = {
  sourceSquare: engine.Square;
  targetSquare: engine.Square;
};

export const BotSelector: React.FC<{
  playerName: string;
  availableBots: AvailableBots;
  selectedBot: SelectedBot;
  setSelectedBot: (bot: SelectedBot) => void;
  disabled: boolean;
}> = ({ playerName, availableBots, selectedBot, setSelectedBot, disabled }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const name = e.target.value;
    setSelectedBot(name ? { name, move: availableBots[name]() } : null);
  };

  return (
    <div className={styles.BotSelector}>
      <label>{playerName}</label>
      <select
        value={selectedBot?.name}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="" key="User">
          User
        </option>
        {Object.keys(availableBots).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </div>
  );
};

const History: React.FC<{ history: Array<engine.Move> }> = ({ history }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [history]);

  return (
    <Card
      className="flex flex-col gap-5 p-5  justify-start  "
      style={{ minWidth: "15rem", maxHeight: "500px", overflowY: "scroll" }}
    >
      {history.map(({ color, piece, from, san }, index: number) => (
        <Text size="lg" key={index}>{`${
          color === "b" ? "Black" : "White"
        } ${piece}: ${from} - ${san}`}</Text>
      ))}
      <div ref={endRef} />
    </Card>
  );
};

const BotTestApp: React.FC<{
  bots: AvailableBots;
  onGameCompleted: (winner: engine.GameWinner) => void;
}> = ({ bots, onGameCompleted }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [fen, setFen] = useState<engine.Fen>(engine.newGame);
  const [history, setHistory] = useState<Array<engine.Move>>([]);
  const [whiteBot, setWhiteBot] = useState<SelectedBot>(null);
  const [blackBot, setBlackBot] = useState<SelectedBot>(null);

  const newGame = () => {
    setPlaying(false);
    setFen(engine.newGame);
    setHistory([]);
  };

  const doMove = useCallback(
    (fen: engine.Fen, from: engine.Square, to: engine.Square) => {
      const move = engine.move(fen, from, to);

      if (!move) {
        return false;
      }

      const [newFen, action] = move;

      if (engine.isGameOver(newFen)) {
        onGameCompleted(engine.getGameWinner(newFen));
        newGame();
        return false;
      }

      setFen(newFen);
      setHistory((history) => [...history, action]);
      return true;
    },
    [onGameCompleted]
  );

  const onDragStart = ({
    sourceSquare: from,
  }: Pick<BoardMove, "sourceSquare">) => {
    const isWhiteBotTurn = whiteBot && engine.isWhiteTurn(fen);
    const isBlackBotTurn = blackBot && engine.isBlackTurn(fen);

    return (
      isPlaying &&
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
    if (!isPlaying) {
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
  }, [isPlaying, fen, whiteBot, blackBot, doMove]);

  return (
    <div className="flex flex-col gap-5 pt-5 mt-5 justify-center items-center align-middle place-content-center">
      <header>
        <h1 className="text-primary text-center">Chessbot</h1>
      </header>
      <div>
        <BotSelector
          playerName="White"
          availableBots={bots}
          selectedBot={whiteBot}
          setSelectedBot={setWhiteBot}
          disabled={isPlaying}
        />
        <BotSelector
          playerName="Black"
          availableBots={bots}
          selectedBot={blackBot}
          setSelectedBot={setBlackBot}
          disabled={isPlaying}
        />
        <button
          className={styles.Button}
          onClick={() => setPlaying((playing) => !playing)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className={styles.Button} onClick={newGame}>
          Reset
        </button>
      </div>
      <div className="flex flex-row gap-5">
        <Chessboard
          position={fen}
          onPieceDragBegin={(piece, sourceSquare) =>
            onDragStart({ sourceSquare })
          }
          onPieceDrop={(sourceSquare, targetSquare, piece) =>
            onMovePiece({ sourceSquare, targetSquare })
          }
          boardWidth={500}
        />

        <History history={history} />
      </div>
    </div>
  );
};

export default BotTestApp;
