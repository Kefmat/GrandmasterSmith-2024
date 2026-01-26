/**
 * EloRatingSystem-klassen representerer et Elo-rating-system.
 * Elo-rating-systemet er en metode for å beregne de relative ferdighetsnivåene til spillere i nullsumspill.
 * Det brukes vanligvis i sjakk og andre konkurransespill.
 * @author Kevin
 */ //TODO Vurder på om dette skal være statisk???
class EloRatingSystem {
  private kFactor: number;

  /**
   * Oppretter en instans av EloRatingSystem.
   * @param {number} kFactor - K-faktoren bestemmer følsomheten til rating-systemet for endringer i rating.
   */
  constructor(kFactor: number = 32) {
    this.kFactor = kFactor;
  }

  /**
   * Beregner den nye ratingen for en spiller etter en kamp.
   * @param {number} playerRating - Spillerens nåværende rating.
   * @param {number} opponentRating - Motstanderens nåværende rating.
   * @param {number} playerScore - Spillerens poeng i kampen (1 for seier, 0.5 for uavgjort, 0 for tap).
   * @returns {number} Spillerens nye rating.
   */
  public calculateNewRating(
    playerRating: number,
    opponentRating: number,
    playerScore: number
  ): number {
    const expectedScore = this.calculateExpectedScore(
      playerRating,
      opponentRating
    );
    const newRating =
      playerRating + this.kFactor * (playerScore - expectedScore);
    return Math.round(newRating);
  }

  /**
   * Beregner den forventede poengsummen til en spiller i en kamp mot en motstander.
   * @param {number} playerRating - Spillerens nåværende rating.
   * @param {number} opponentRating - Motstanderens nåværende rating.
   * @returns {number} Spillerens forventede poengsum.
   */
  private calculateExpectedScore(
    playerRating: number,
    opponentRating: number
  ): number {
    const exponent = (opponentRating - playerRating) / 400;
    return 1 / (1 + Math.pow(10, exponent));
  }
}
