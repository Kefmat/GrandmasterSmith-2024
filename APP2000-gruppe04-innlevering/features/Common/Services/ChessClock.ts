class ChessClock {
  private timeLeft: { [key in "w" | "b"]: number }; // in seconds
  private lastMoveTime: number; // in milliseconds
  private currentPlayer: "w" | "b"; // 'w' for white, 'b' for black
  private increment: number; // in seconds
  private updateTime: () => void = () => {};
  private isGameOverHandler: () => void = () => {};
  private turnTime: { [key in "w" | "b"]: number } = { w: 0, b: 0 };
  private totalTime = 0;
  private allTimeSets: { [key in "w" | "b"]: number[] } = { w: [], b: [] };
  private turnCount = 0;
  constructor(
    timeInMin: number,
    timeInSecIncrement: number,
    updateTime: () => void,
    isGameOverHandler: () => void
  ) {
    this.timeLeft = {
      w: timeInMin * 60, // convert minutes to seconds
      b: timeInMin * 60, // convert minutes to seconds
    };
    this.lastMoveTime = Date.now();
    this.currentPlayer = "w"; // white starts
    this.increment = timeInSecIncrement;
    this.updateTime = updateTime;
    this.isGameOverHandler = isGameOverHandler;
    console.log("Chess clock created");
    console.log("Time left for white: " + this.timeLeft["w"]);
  }

  // Call this method after a player makes a move
  makeMove(): void {
    const currentTime = Date.now();
    const timeSpentOnLastMove = currentTime - this.lastMoveTime;
    this.timeLeft[this.currentPlayer] -= timeSpentOnLastMove / 1000; // convert milliseconds to seconds
    this.timeLeft[this.currentPlayer] += this.increment; // add the increment
    this.lastMoveTime = currentTime;
    this.turnTime[this.currentPlayer] = 0;
    this.allTimeSets[this.currentPlayer].push(timeSpentOnLastMove / 1000);
    this.currentPlayer = this.currentPlayer === "w" ? "b" : "w"; // switch player
    if (this.currentPlayer !== "b") {
      this.turnCount++;
      console.log("Turn count: " + this.turnCount);
      console.log(
        "Time left for white: " + this.allTimeSets.w[this.turnCount - 1],
        this.allTimeSets.b[0]
      );
    }
  }

  getTimeLeft(player: "w" | "b"): number {
    return this.timeLeft[player];
  }

  getCurrentPlayer(): "w" | "b" {
    return this.currentPlayer;
  }

  getTurnTime(player: "w" | "b"): number {
    return this.turnTime[player];
  }

  getTotalTime(): number {
    return this.totalTime;
  }

  isTimeOut(): boolean {
    const isTimeOut = this.timeLeft["w"] <= 0 || this.timeLeft["b"] <= 0;
    if (isTimeOut) {
      this.isGameOverHandler();
    }
    return isTimeOut;
  }
  updateClockTime(): void {
    this.updateTime();
    this.timeLeft[this.currentPlayer]--;
    this.turnTime[this.currentPlayer]++;
    this.totalTime++;
    console.log(
      "Time left for " +
        this.currentPlayer +
        ": " +
        this.timeLeft[this.currentPlayer]
    );
  }
}

export default ChessClock;
