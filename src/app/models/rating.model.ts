export class RatingModel {
  idList: number;
  idRating: number;
  rate: number;
  idGame: number;
  idConsole: number;
  finalized: number;
  nameGame: string;
  photo: string;
  nameConsole: string;

  constructor({
    idList = null,
    idRating = null,
    rate = null,
    idGame = null,
    idConsole = null,
    finalized = null,
    nameGame = null,
    photo = null,
    nameConsole = null,
  }) {
    this.idList = idList;
    this.idRating = idRating;
    this.rate = rate;
    this.idGame = idGame;
    this.idConsole = idConsole;
    this.finalized = finalized;
    this.nameGame = nameGame;
    this.photo = photo;
    this.nameConsole = nameConsole;
  }
}
