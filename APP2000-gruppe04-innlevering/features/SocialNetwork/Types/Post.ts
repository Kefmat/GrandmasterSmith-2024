/**
 * Representerer en post i systemet.
 * @author Borgar Flaen Stensrud
 * @param description - Beskrivelse av posten.
 * @param _id - ID til posten.
 * @param user - ID til brukeren som har laget posten.
 * @param createdAt - Dato og tid for når posten ble opprettet.
 * @param updatedAt - Dato og tid for når posten ble oppdatert.
 * @param comments - Kommentarer til posten.
 * @param likedBy - Brukere som har likt posten.
 * @param shares - Delinger av posten.
 * @param public - Om posten er offentlig eller ikke.
 *
 * @see Comment
 * @see User
 * @see Share
 *
 * @example _id: "5f8f4a5b9b0f9b2b3c9d4e5f"
 * @example description: "Dette er en post"
 * @example user: "5f8f4a5b9b0f9b2b3c9d4e5f"
 * @example createdAt: "2020-10-20T12:00:00.000Z"
 * @example updatedAt: "2020-10-20T12:00:00.000Z"
 * @example comments: []
 * @example likedBy: []
 * @example shares: []
 * @example public: true
 *
 * TODO: implementer til likes, shares og comments.
 *
 */

import Comment from "./Comment";
import User from "./User";
import Share from "./Share";
export default interface Post {
  description: string;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  likedBy: User[];
  shares: Share[];
  public: boolean;
}
