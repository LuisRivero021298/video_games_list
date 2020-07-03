import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { GameModel } from "../../models/game.model";
import { ConsoleModel } from "../../models/console.model";
import { GameService } from "../../services/game.service";
import { ConsoleService } from "../../services/console.service";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: [],
})
export class RatingComponent implements OnInit {
  gamesList: Array<GameModel>;
  consolesList: Array<ConsoleModel>;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _game: GameService,
    private _consoles: ConsoleService
  ) {
    this.gamesList = [new GameModel()];
    this.consolesList = [new ConsoleModel()];
    this.formCreate();
    this.getAllGames();
    this.getAllConsoles();
  }

  ngOnInit(): void {}

  formCreate() {
    this.form = this._fb.group({
      games: [null],
      consoles: [null],
      rating: [null],
      finalized: [null],
    });
  }

  getAllGames() {
    this._game.allGames().subscribe(
      (games: Array<object>) => {
        this.gamesList = this.organizeGameData(games);
      },
      (err) => console.log(err)
    );
  }

  getAllConsoles() {
    this._consoles.allConsoles().subscribe(
      (consoles: Array<object>) => {
        this.consolesList = this.organizeConsoleData(consoles);
      },
      (err) => console.log(err)
    );
  }

  private organizeGameData(data: Array<object>) {
    let newData = [];
    let game = {};

    for (let i = 0; i < data.length; i++) {
      game["idGame"] = data[i]["id_game"];
      game["nameGame"] = data[i]["name_game"];

      newData.push(new GameModel(game));
    }

    return newData;
  }

  private organizeConsoleData(data: Array<object>) {
    let newData = [];
    let vConsole = {};

    for (let i = 0; i < data.length; i++) {
      vConsole["idConsole"] = data[i]["id_console"];
      vConsole["nameConsole"] = data[i]["name_console"];

      newData.push(new ConsoleModel(vConsole));
    }

    return newData;
  }
}
