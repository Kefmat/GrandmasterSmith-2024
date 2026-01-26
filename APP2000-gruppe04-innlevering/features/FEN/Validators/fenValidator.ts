/**
 * Sjekker om en gitt FEN (Forsyth-Edwards Notation) streng er gyldig.
 * FEN brukes for å beskrive en spesifikk posisjon på et sjakkbrett.
 * @author Borgar Flaen Stensrud
 * @param {string} fen - FEN strengen som skal valideres.
 * @returns {boolean} - Returnerer true hvis FEN strengen er gyldig, ellers false.
 * @Reference fått litt hjelp av chatgpt til å finne noen av disse mønsterne.
 */
const isValidFen = (fen: string): boolean => {
  // Sjekk om FEN strengen er tom.
  if (!fen) return false;

  // Deler FEN strengen inn i seks deler basert på mellomrom.
  const parts = fen.split(" ");
  if (parts.length !== 6) return false;

  // Deler den første delen av FEN strengen i åtte rader basert på skråstreker.
  const rows = parts[0].split("/");
  if (rows.length !== 8) return false;

  // Itererer gjennom hver rad for å validere brikkenes plassering.
  for (let row of rows) {
    let sum = 0; // Summen av brikkene og tomme feltene i raden.
    let previousWasNumber = false; // Markerer om forrige tegn var et tall.

    for (let char of row) {
      // Sjekker om tegnet er et tall (tomt felt).
      if (!isNaN(char as any)) {
        // Hvis forrige tegn også var et tall, er det en feil i FEN strengen.
        if (previousWasNumber) return false;
        sum += parseInt(char, 10); // Legger til antall tomme felt.
        previousWasNumber = true;
      } else {
        // Sjekker om tegnet er en gyldig brikke.
        if (!"prnbqkPRNBQK".includes(char)) return false;
        sum += 1; // Legger til en brikke.
        previousWasNumber = false;
      }
    }

    // Hvis summen av brikkene og tomme feltene ikke er 8, er raden ugyldig.
    if (sum !== 8) return false;
  }

  // Sjekker om den andre delen av FEN strengen er en gyldig spiller (hvit eller svart).
  if (!"wb".includes(parts[1])) return false;

  // Validerer rokade-tilgjengelighet.
  if (!/^K?Q?k?q?$/.test(parts[2])) return false;

  // Validerer feltet for en passant-mulighet.
  if (!(parts[3] === "-" || /^[abcdefgh][36]$/.test(parts[3]))) return false;

  // Sjekker halvtrekk-telleren, som må være et tall og ikke negativt.
  if (isNaN(parts[4] as any) || parseInt(parts[4], 10) < 0) return false;

  // Sjekker trekknummeret, som må være et tall og minst 1.
  if (isNaN(parts[5] as any) || parseInt(parts[5], 10) < 1) return false;

  // Returnerer true hvis alle sjekker passerer, noe som betyr at FEN strengen er gyldig.
  return true;
};

export default isValidFen;
