import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FilesService {
  url = "http://localhost:3000/api";

  constructor(private _http: HttpClient) {}

  uploadFile(file) {
    console.log(file);
    let headers = new HttpHeaders().set("Content-Type", "form-data");
    return this._http.post(`${this.url}/upload-image`, file);
  }
}
