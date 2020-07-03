import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { GameModel } from "../../models/game.model";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: [],
})
export class RatingComponent implements OnInit {
  gamesList: Array<GameModel>;
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.gamesList = [new GameModel()];
  }

  ngOnInit(): void {}

  formCreate() {
    this.form = this._fb.group({
      games: [""],
      consoles: [""],
      rating: [""],
      finalized: [""],
    });
  }
}
