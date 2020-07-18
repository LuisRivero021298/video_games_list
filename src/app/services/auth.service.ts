import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { Login } from "../interfaces/Login.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string;
  userToken: string;

  constructor(private _http: HttpClient, private _g: GlobalService) {
    this.readToken();
    this.url = this._g.getUrl();
  }

  getUser(idUser: string): Observable<any> {
    const headers = new HttpHeaders().set("x-access-token", idUser);
    return this._http
      .get<any>(`${this.url}/profile`, { headers })
      .pipe(
        map((resp) => {
          this.saveUserInStorage(
            resp.data.response[0].username,
            resp.data.response[0].photo,
            resp.data.response[0].birthdate
          );
          return resp.data.response[0];
        })
      );
  }

  saveUserInStorage(username: string, photo: string, birthdate: string) {
    localStorage.setItem("username", username);
    localStorage.setItem("photo", photo);
    localStorage.setItem("birthdate", birthdate);
  }

  newUser(newUser: UserModel): Observable<any> {
    let newU = JSON.stringify(newUser);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post<any>(`${this.url}/register`, newU, { headers });
  }

  updateUser(updateUser: UserModel, idUser: string): Observable<any> {
    let user = JSON.stringify(updateUser);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-access-token", idUser);
    return this._http.put(`${this.url}/update`, user, { headers });
  }

  login(userLogin: UserModel): Observable<any> {
    const login = {
      email: userLogin.email,
      password: userLogin.password
    }
    const log = JSON.stringify(login);
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http
      .post<any>(`${this.url}/signin`, log, { headers })
      .pipe(
        map((resp) => {
          this.saveToken(resp.data.token, resp.data.expireIn);
          return resp;
        })
      );
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expireIn");
    localStorage.removeItem("username");
    localStorage.removeItem("birthdate");
    localStorage.removeItem("photo");
  }

  readToken() {
    const tokenStorage = localStorage.getItem("token");
    return tokenStorage
      ? (this.userToken = tokenStorage)
      : (this.userToken = null);
  }

  isAuthenticated(): boolean {
    if (this.userToken === null || this.userToken === undefined) {
      return false;
    }

    return this.expiredToken();
  }

  private expiredToken(): boolean {
    const expire = Number(localStorage.getItem("expireIn"));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if (expireDate > new Date()) {
      return true;
    } else {
      this.logOut();
      return false;
    }
  }

  private saveToken(idToken: string, expireIn: number) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    this.tokenExpireIn(expireIn);
  }

  private tokenExpireIn(expireIn: number) {
    const today = new Date();
    today.setSeconds(expireIn);
    localStorage.setItem("expireIn", today.getTime().toString());
  }
}
