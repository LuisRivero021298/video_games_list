import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GameService {
  url: string;
  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.url = this._g.getUrl();
  }

  allGames() {
    return this._http.get(`${this.url}/games`).pipe(
      map((games: object) => {
        return games["data"].games;
      })
    );
  }
}
