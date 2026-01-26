import type { Fen } from "./engine";
import { Chess } from "chess.js";

export type UninitialisedBot = () => InitialisedBot;
export type InitialisedBot = (fen: Fen) => Promise<any>;
export type AvailableBots = Record<string, UninitialisedBot>;

const randomMove: UninitialisedBot = () => (fen) =>
  new Promise((resolve) => {
    const chess = new Chess();
    chess.load(fen);
    const moves = chess.moves({ verbose: true });
    const { from, to } = moves[Math.floor(Math.random() * moves.length)];
    setTimeout(() => resolve({ from, to }), 500);
  });

const uciWorker =
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

    return (fen) =>
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

const Bots: AvailableBots = {
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

export default Bots;
