import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ListService {
  constructor(private _http: HttpClient) {}
  url = "http://localhost:3000/api";

  getListsByUser(idUser: string) {
    let headers = new HttpHeaders().set("x-access-token", idUser);

    return this._http.get(`${this.url}/lists`, { headers });
  }

  addList(list) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let newList = JSON.stringify(list);
    return this._http.post(`${this.url}/list`, newList, { headers });
  }
}
