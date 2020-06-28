import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import { RatingModel } from "../../models/rating.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styles: [],
})
export class ListComponent implements OnInit {
  ratings = Array<RatingModel>;
  screenSize = {
    screenWidth: 0,
    screenHeight: 0,
  };

  constructor(private _router: Router, private _alert: AlertsService) {}
  

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.height;
    this.screenSize.screenWidth = screen.width;
  }

  getAllRatings() {}
}
