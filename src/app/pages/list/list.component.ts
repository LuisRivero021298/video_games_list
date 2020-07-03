import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import { ListService } from "../../services/list.service";
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
    private _rating: RatingService,
    private _list: ListService
  ) {
    this.ratings = [];
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.height;
    this.screenSize.screenWidth = screen.width;
    this.getNameList();
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

  goToCreateRating() {
    const idList = this._aRoute.snapshot.params.id_list;
    this._router.navigateByUrl(`/rating/${idList}`);
  }

  private getNameList() {
    let id = this._aRoute.snapshot.params.id_list;
    this._list.getList(id).subscribe(
      (nameList: string) => {
        this.nameList = nameList;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private organizeRatingData(resp: Array<any>) {
    let data = [];
    let rating = {};
    for (let i = 0; i < resp.length; i++) {
      rating["idRating"] = resp[i].id_rating;
      rating["rate"] = resp[i].rate;
      rating["idGame"] = resp[i].id_game;
      rating["nameGame"] = resp[i].name_game;
      rating["photo"] = resp[i].photo;
      rating["nameConsole"] = resp[i].name_console;

      data.push(new RatingModel(rating));
    }

    return data;
  }
}

