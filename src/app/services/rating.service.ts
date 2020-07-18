import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class RatingService {
  url: string;
  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.url = this._g.getUrl();
  }

  getAllRatings(idList: number) {
    return this._http.get(`${this.url}/rating/${idList}`);
  }

  createNewRating(data: any) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(`${this.url}/rating`, data, { headers });
  }
}
