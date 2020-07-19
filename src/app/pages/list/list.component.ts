import { GlobalService } from "./../../services/global.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import { ListService } from "../../services/list.service";
import { RatingModel } from "../../models/rating.model";
import { RatingService } from "../../services/rating.service";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styles: [],
})
export class ListComponent implements OnInit {
  ratings: Array<RatingModel>;
  nameList: string;
  url: string;
  screenSize = {
    screenWidth: 0,
    screenHeight: 0,
  };

  private idList: number;

  constructor(
    private _g: GlobalService,
    private _router: Router,
    private _aRoute: ActivatedRoute,
    private _alert: AlertsService,
    private _rating: RatingService,
    private _list: ListService
  ) {
    this.url = this._g.getUrl();
    this.ratings = [];
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.height;
    this.screenSize.screenWidth = screen.width;
    this.idList = this._aRoute.snapshot.params.id_list;
    this.getNameList();
    this.getAllRatings();
  }

  getAllRatings() {
    this._rating.getAllRatings(this.idList).subscribe(
      (resp: any) => {
        const data = this.organizeRatingData(resp.data.ratings);
        this.ratings = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  goToCreateRating() {
    this._router.navigateByUrl(`/rating/${this.idList}`);
  }

  deleteRating(id: number) {
    this._alert
      .delete()
      .then((res) => {
        if (res.value) {
          this._rating.deleteRating(id).subscribe(
            () => {
              const great = this.lastDelete();
              this._alert.success("Rating has been deleted");
              this.getAllRatings();

              if (great === id) {
                this.savePhotoList(id);
              }
            },
            (err) => console.log(err)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private lastDelete() {
    let great = 0;
    for (let i = 0; i < this.ratings.length; i++) {
      if (this.ratings[i].idRating > great) {
        great = this.ratings[i].idRating;
      }
    }

    return great;
  }

  private savePhotoList(id: number) {
    let { photo } = this.ratings.find((rate) => {
      return rate.idRating < id;
    });
    const nameImage = {
      photo,
      id_list: this.idList,
    };
    console.log(nameImage);
    this._list.addListImage(nameImage).subscribe(
      () => true,
      (err) => console.log(err)
    );
  }

  private getNameList() {
    this._list.getList(this.idList).subscribe(
      (nameList: string) => {
        this.nameList = nameList;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private organizeRatingData(resp: Array<any>) {
    const data = [];
    const rating = {};

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
