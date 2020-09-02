export class GameModel {
  idGame: number;
  nameGame: string;
  dateRelease: string;
  genre: number;
  description: string;
  photo: string;

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
