import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RatingService {
  url = "http://localhost:3000/api";

  constructor(private _http: HttpClient) {}

  getAllRatings(idList: string) {
    return this._http.get(`${this.url}/rating/${idList}`);
  }
}
