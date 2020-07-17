export class ConsoleModel {
  idConsole: number;
  nameConsole: string;
  dateRelease: string;
  dateDiscontinued: string;

  constructor({
    idConsole = null,
    nameConsole = null,
    dateRelease = null,
    dateDiscontinued = null,
  }) {
    this.idConsole = idConsole;
    this.nameConsole = nameConsole;
    this.dateRelease = dateRelease;
    this.dateDiscontinued = dateDiscontinued;
  }
}
