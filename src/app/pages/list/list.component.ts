import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import { RatingModel } from "../../models/rating.model";
import { RatingService } from "../../services/rating.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styles: [],
})
export class ListComponent implements OnInit {
  ratings: Array<RatingModel>;
  nameList: string;
  url = "http://localhost:3000/api";
  screenSize = {
    screenWidth: 0,
    screenHeight: 0,
  };

  constructor(
    private _router: Router,
    private _aRoute: ActivatedRoute,
    private _alert: AlertsService,
    private _rating: RatingService
  ) {
    this.ratings = [];
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.height;
    this.screenSize.screenWidth = screen.width;
    this.nameList = this._aRoute.snapshot.params.name_list;
    this.getAllRatings();
  }

  getAllRatings() {
    let idList = this._aRoute.snapshot.params.id_list;
    this._rating.getAllRatings(idList).subscribe(
      (resp: any) => {
        let data = this.organizeRatingData(resp.data.ratings);
        this.ratings = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  private organizeRatingData(resp: Array<any>) {
    let data = [];

    for (let i = 0; i < resp.length; i++) {
      data.push(
        new RatingModel([
          resp[i].id_rating,
          resp[i].rate,
          resp[i].id_game,
          resp[i].name_game,
          resp[i].photo,
          resp[i].name_console,
        ])
      );
    }

    return data;
  }
}
