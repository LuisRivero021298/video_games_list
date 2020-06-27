export class ListModel {
  idList: number;
  nameList: string;
  photoList: string;

  constructor(
    idList: number = 0,
    nameList: string = null,
    photoList: string = null
  ) {
    this.idList = idList;
    this.nameList = nameList;
    this.photoList = photoList;
  }
}
