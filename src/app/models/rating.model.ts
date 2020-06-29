export class RatingModel {
  idRating: number;
  rate: number;
  idGame: number;
  nameGame: string;
  photo: string;
  nameConsole: string;

  constructor([
    idRating = null,
    rate = null,
    idGame = null,
    nameGame = null,
    photo = null,
    nameConsole = null,
  ]) {
    this.idRating = idRating;
    this.rate = rate;
    this.idGame = idGame;
    this.nameGame = nameGame;
    this.photo = photo;
    this.nameConsole = nameConsole;
  }
}
