import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ConsoleService {
  url: string;
  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.url = this._g.getUrl();
  }

  allConsoles() {
    return this._http.get(`${this.url}/consoles`).pipe(
      map((consoles: object) => {
        return consoles["data"].consoles;
      })
    );
  }
}
