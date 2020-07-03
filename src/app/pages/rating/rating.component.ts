import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: [],
})
export class RatingComponent implements OnInit {
  gamesList: Array<any>;
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.gamesList = [
      {
        idGame: 1,
        nameGame: "Final Fantasy",
      },
      {
        idGame: 2,
        nameGame: "Dmc Devil may cry",
      },
    ];
  }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.form = this._fb.group({
      game: [""],
      console: [""],
      rating: [""],
      finalized: [""],
    });
  }
}
