import {
  BlitzChess,
  BulletChess,
  ClassicalChess,
  RapidChess,
} from "../Types/Chess/GameMode/GameModes";

const defaultMode: ClassicalChess = {
  mode: "Classical",
  rules: { timeInMin: 90, timeInSecIncrement: 30 },
  description:
    "A clasical game mode for 90 minutes with a 30-second increment.",
  imageUrl: "/images/chess/classicalchess.webp",
};

const classical: ClassicalChess = {
  mode: "Classical",
  rules: { timeInMin: 90, timeInSecIncrement: 30 },
  description:
    "A clasical game mode for 90 minutes with a 30-second increment.",
  imageUrl: "/images/chess/classicalchess.webp",
};

const bulletGame: BulletChess = {
  mode: "Bullet",
  rules: { timeInMin: 1, timeInSecIncrement: 0 },
  description:
    "A fast-paced game mode where each player has only one minute to make all their moves.",
  imageUrl: "/images/chess/bulletchess.webp",
};

const rapidChess: RapidChess = {
  mode: "Rapid",
  rules: { timeInMin: 15, timeInSecIncrement: 10 },
  description:
    "A game mode where each player has 15 minutes to make all their moves, with a 10-second increment.",
  imageUrl: "/images/chess/rapid.webp",
};

const blitzChess: BlitzChess = {
  mode: "Blitz",
  rules: { timeInMin: 3, timeInSecIncrement: 2 },
  description:
    "A game mode where each player has 3 minutes to make all their moves, with a 2-second increment.",
  imageUrl: "/images/chess/lightning.webp",
};

const allGameModes = [classical, bulletGame, rapidChess, blitzChess];

export {
  defaultMode,
  classical,
  bulletGame,
  rapidChess,
  blitzChess,
  allGameModes,
};
