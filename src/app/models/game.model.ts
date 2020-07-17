export class GameModel {
  idGame: number;
  nameGame: string;
  dateRelease: string;
  genre: number;
  description: string;
  photo: string;

  /*constructor(game: object = {}) {
    this.idGame = game["idGame"] ? game["idGame"] : null;
    this.nameGame = game["nameGame"] ? game["nameGame"] : null;
    this.dateRelease = game["dateRelease"] ? game["dateRelease"] : null;
    this.genre = game["genre"] ? game["genre"] : null;
    this.description = game["description"] ? game["description"] : null;
    this.photo = game["photo"] ? game["photo"] : null;
  }*/

  constructor({
    idGame = null,
    nameGame = null,
    dateRelease = null,
    genre = null,
    description = null,
    photo = null,
  }) {
    this.idGame = idGame;
    this.nameGame = nameGame;
    this.dateRelease = dateRelease;
    this.genre = genre;
    this.description = description;
    this.photo = photo;
  }
}
