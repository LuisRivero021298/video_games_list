import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { GameModel } from "../../models/game.model";
import { ConsoleModel } from "../../models/console.model";
import { ListService } from "../../services/list.service";
import { GameService } from "../../services/game.service";
import { ConsoleService } from "../../services/console.service";
import { RatingService } from "../../services/rating.service";
import { AlertsService } from "../../services/alerts.service";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: [],
})
export class RatingComponent implements OnInit {
  gamesList: Array<GameModel>;
  consolesList: Array<ConsoleModel>;
  rating: object;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _game: GameService,
    private _list: ListService,
    private _location: Location,
    private _consoles: ConsoleService,
    private _aRoute: ActivatedRoute,
    private _rating: RatingService,
    private _alert: AlertsService
  ) {
    this.gamesList = [new GameModel({})];
    this.consolesList = [new ConsoleModel({})];
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

  createRating() {
    this._alert.loading();

    let idList = this._aRoute.snapshot.params.id_list;
    idList = parseInt(idList);
    this.rating = {
      idList: idList,
      ...this.form.value,
    };

    this._rating.createNewRating(this.rating).subscribe(
      (resp) => {
        this.savePhotoList(this.form.value.games, idList);
        this._alert.closeAlert();
        this._alert.success("rating created successfully");
        this.resetForm();
      },
      () => this._alert.error(`Rating Don't create`)
    );
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

  backClick() {
    this._location.back();
  }

  private savePhotoList(idGame: number, idList: number) {
    let gameSelected = this.gamesList.find((game) => game.idGame === idGame);
    const newImage = {
      photo: gameSelected.photo,
      id_list: idList,
    };
    this._list.addListImage(newImage).subscribe(
      () => true,
      () => false
    );
  }

  private resetForm() {
    this.form.reset();
  }

  private organizeGameData(data: Array<object>) {
    let newData = [];
    let game = {};

    for (let i = 0; i < data.length; i++) {
      game["idGame"] = data[i]["id_game"];
      game["nameGame"] = data[i]["name_game"];
      game["photo"] = data[i]["photo"];
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
