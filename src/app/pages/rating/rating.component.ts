import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { RatingValidator } from "../../validators/app.validator";
import { ActivatedRoute } from "@angular/router";
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
    this.form = this._fb.group(
      {
        games: [null, [Validators.required]],
        consoles: [null, [Validators.required]],
        rating: [null, [Validators.required]],
        finalized: [null, [Validators.required]],
      },
      {
        validators: RatingValidator,
      }
    );
  }

  validateForm() {
    this.form.invalid ? this.showInvalids(this.form) : this.createRating();
  }

  createRating() {
    this._alert.loading();

    let idList = this._aRoute.snapshot.params.id_list;
    idList = parseInt(idList);
    this.rating = {
      idList,
      ...this.form.value,
    };

    this._rating.createNewRating(this.rating).subscribe(
      () => {
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
    const { photo } = this.gamesList.find((game) => game.idGame === idGame);
    const newImage = {
      photo,
      id_list: idList,
    };
    this._list.addListImage(newImage).subscribe(
      () => true,
      () => false
    );
  }

  private showInvalids(validate: FormGroup) {
    if (validate.invalid) {
      return Object.values(validate.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  private resetForm() {
    this.form.reset();
  }

  private organizeGameData(data: Array<object>) {
    const newData = [];
    const game = {};

    for (let i = 0; i < data.length; i++) {
      game["idGame"] = data[i]["id_game"];
      game["nameGame"] = data[i]["name_game"];
      game["photo"] = data[i]["photo"];
      newData.push(new GameModel(game));
    }

    return newData;
  }

  private organizeConsoleData(data: Array<object>) {
    const newData = [];
    const vConsole = {};

    for (let i = 0; i < data.length; i++) {
      vConsole["idConsole"] = data[i]["id_console"];
      vConsole["nameConsole"] = data[i]["name_console"];

      newData.push(new ConsoleModel(vConsole));
    }

    return newData;
  }

  get gameInvalid() {
    return this.form.get("games").invalid && this.form.get("games").touched;
  }

  get consoleInvalid() {
    return (
      this.form.get("consoles").invalid && this.form.get("consoles").touched
    );
  }

  get ratingInvalid() {
    return this.form.get("rating").invalid && this.form.get("rating").touched;
  }

  get ratingInvalidValue(): boolean {
    return this.form.hasError("invalidRating") && this.form.get("rating").dirty;
  }

  get finalizedInvalid() {
    return (
      this.form.get("finalized").invalid && this.form.get("finalized").touched
    );
  }
}
