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

  constructor(rating: object = {}) {
    this.idList = rating["idList"] ? rating["idList"] : null;
    this.idRating = rating["idRating"] ? rating["idRating"] : null;
    this.rate = rating["rate"] ? rating["rate"] : null;
    this.idGame = rating["idGame"] ? rating["idGame"] : null;
    this.idConsole = rating["idConsole"] ? rating["idConsole"] : null;
    this.nameGame = rating["nameGame"] ? rating["nameGame"] : null;
    this.photo = rating["photo"] ? rating["photo"] : null;
    this.nameConsole = rating["nameConsole"] ? rating["nameConsole"] : null;
    this.finalized = rating["finalized"] ? rating["finalized"] : null;
  }
}
