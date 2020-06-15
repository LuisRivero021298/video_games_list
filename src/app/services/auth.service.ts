import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Login } from '../interfaces/Login.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	url = 'http://localhost:3000/api';
	userToken: string;

  constructor( private _http: HttpClient ) { 
    this.readToken();
  }

  getUser(idUser: string) {
    let token = this.readToken();
    let headers = new HttpHeaders().set('x-access-token', idUser);
    return this._http.get<any>(this.url+'/profile', { headers }
    ).pipe(
      map(resp => {
        return resp.data.response[0];
      })
    );

  }

  newUser(newUser: UserModel): Observable<any> {
  	let newU = JSON.stringify(newUser);
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log(newU);
  	return this._http.post<any>(
      this.url+'/register', newU, { headers }
    ).pipe(
      map( resp => {
        this.saveToken(resp.data.token, resp.data.expireIn);
        return resp;
      })
    );
  }

  login(userLogin: Login): Observable<any> {
    let log = JSON.stringify(userLogin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(
      this.url+'/signin', log, { headers }
    ).pipe(
      map( resp => {
        console.log(resp.data);
        this.saveToken(resp.data.token, resp.data.expireIn);
        return resp;
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expireIn');
  }
  
  readToken() {
    let tokenStorage = localStorage.getItem('token');
    return (tokenStorage) ? this.userToken = tokenStorage : this.userToken = null;
  }

  isAuthenticated() : boolean {
    if (this.userToken === null || this.userToken === undefined) {
      return false;
    }

    return this.expiredToken();
  }

  private expiredToken(): boolean {
    const expire = Number(localStorage.getItem('expireIn'));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if (expireDate > new Date()) {
      return true;
    } else {
      this.logOut();
      return false;
    } 
  }

  private saveToken(idToken:string, expireIn: number) {
 		this.userToken = idToken;
 		localStorage.setItem('token', idToken);

 		this.tokenExpireIn(expireIn);
 	}

 	private tokenExpireIn(expireIn:number) {
 		let today = new Date();
 		today.setSeconds(expireIn);
 		localStorage.setItem('expireIn', today.getTime().toString());
 	}
}
