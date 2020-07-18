import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class FilesService {
  url: string;

  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.url = this._g.getUrl();
  }

  uploadFile(file) {
    let headers = new HttpHeaders().set("Content-Type", "form-data");
    return this._http.post(`${this.url}/upload-image`, file);
  }
}
