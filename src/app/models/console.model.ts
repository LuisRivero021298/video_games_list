export class ConsoleModel {
  idConsole: number;
  nameConsole: string;
  dateRelease: string;
  dateDiscontinued: string;

  constructor(vConsole: object = {}) {
    this.idConsole = vConsole["idConsole"] ? vConsole["idConsole"] : null;
    this.nameConsole = vConsole["nameConsole"] ? vConsole["nameConsole"] : null;
    this.dateRelease = vConsole["dateRelease"] ? vConsole["dateRelease"] : null;
    this.dateDiscontinued = vConsole["dateDiscontinued"]
      ? vConsole["dateDiscontinued"]
      : null;
  }
}
