/**
 * typer for gamestate i sjakkspillet, brukes til å navigere mellom forskjellige meny-skjermer i sjakk-spillene!
 * @author Borgar Flaen Stensrud
 */

export type GameStateRecording =
  | "ChoseSideRecordOpening"
  | "ChoseModeRecordOpening"
  | "StartClockRecordOpening"
  | "RunningRecordOpening"
  | "PracticeInitRecording";

export type GameState =
  | "ChoseSide"
  | "ChoseMode"
  | "StartClock"
  | "Running"
  | "GameOver"
  | "SteelMate"
  | "Victory"
  | "Forfeit"
  | "Streaming"
  | "Practicing"
  | "End"
  | "Spectating"
  | "Practice"
  | "Paused"
  | "Resumed"
  | "Replay"
  | "ReplayEnd"
  | "ReplayPaused"
  | "ReplayResumed"
  | "ReplayStart"
  | "PracticeInit"
  | "ChoseSidePractice"
  | "ChoseModePractice"
  | "StartClockPractice"
  | "ChoseSideRecordPractice"
  | "ChoseModeRecordPractice"
  | "StartClockRecordPractice"
  | "RunningRecordPractice"
  | "PracticeEnd"
  | "RunningPractice"
  | "RecordPractice"
  | "RecordPracticeInit"
  | "RecordPracticeEnd"
  | "ChoseSideAI"
  | "ChoseModeAI"
  | "StartClockAI"
  | "ChoseAI"
  | "RunningAI"
  | "";

export type GameStateExtended = GameState | GameStateRecording;
