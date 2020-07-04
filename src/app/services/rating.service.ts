import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class RatingService {
  constructor(private _http: HttpClient, private _g: GlobalService) {}

  getAllRatings(idList: string) {
    return this._http.get(`${this._g.getUrl()}/rating/${idList}`);
  }

  createNewRating(data: any) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(`${this._g.getUrl()}/rating`, data, { headers });
  }
}
