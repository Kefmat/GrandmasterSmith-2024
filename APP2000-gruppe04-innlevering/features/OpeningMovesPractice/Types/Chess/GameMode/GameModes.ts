/**
 * GameModes.ts - Denne filen inneholder forskjellige spillmoduser som kan brukes i sjakkspillet.
 * Hver spillmodus har en unik type, bildeurl, beskrivelse og regler.
 * @author Borgar Flaen Stensrud
 */

export type GameModeType = "Bullet" | "Blitz" | "Rapid" | "Classical";

export interface GameRules {
  timeInSecIncrement: number;
  timeInMin: number;
}

export interface GameMode {
  mode: GameModeType;
  imageUrl: string;
  description: string;
  rules: GameRules;
}

export interface BulletChess extends GameMode {
  mode: "Bullet";
  description: string;
}
export interface BlitzChess extends GameMode {
  mode: "Blitz";
  description: string;
}
export interface RapidChess extends GameMode {
  mode: "Rapid";
  description: string;
}
export interface ClassicalChess extends GameMode {
  mode: "Classical";
  description: string;
}
