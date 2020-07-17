import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class ListService {
  url: string;
  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.url = this._g.getUrl();
  }

  getListsByUser(idUser: string) {
    let headers = new HttpHeaders().set("x-access-token", idUser);

    return this._http.get(`${this.url}/lists`, { headers });
  }

  getList(idList: number) {
    return this._http.get(`${this.url}/list/${idList}`).pipe(
      map((resp: object) => {
        return resp["data"].response[0].name_list;
      })
    );
  }

  addList(list) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let newList = JSON.stringify(list);
    return this._http.post(`${this.url}/list`, newList, { headers });
  }

  addListImage(nameImage: object) {
    console.log(nameImage);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    const newImage = JSON.stringify(nameImage);
    return this._http.post(`${this.url}/list/image`, newImage, { headers });
  }
}
