import { GAME_STATE_CONSTANT_PRACTICE } from "../Constants/GameState";
import { GameStateExtended } from "@/features/OpeningMovesPractice/Types/GameState";

const isGameStatePracticeRecording = (state: GameStateExtended): boolean => {
  return GAME_STATE_CONSTANT_PRACTICE.includes(state);
};

export default isGameStatePracticeRecording;
