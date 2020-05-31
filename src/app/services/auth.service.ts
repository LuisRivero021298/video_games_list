import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	url = 'http://localhost:3000/api';
	userToken: string;

  constructor( private _http: HttpClient ) { }

  newUser(newUser: UserModel): Observable<any> {
  	let newU = JSON.stringify(newUser);
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');
  	return this._http.post<any>(this.url+'/user', newU, { headers });
  }

  login(userLogin: any): Observable<any> {
    let log = JSON.stringify(userLogin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url+'/user/login', log, { headers });
  }

  readToken() {
    let tokenStorage = localStorage.getItem('token');
    return (tokenStorage) ? this.userToken = tokenStorage : this.userToken = '';
  }

  private saveToken(idToken:string, expireIn: number) {
 		this.userToken = idToken;
 		localStorage.setItem('token', idToken);

 		this.saveTokenExpires(expireIn);
 	}

 	private saveTokenExpires(expireIn:number) {
 		let today = new Date();
 		today.setSeconds(expireIn);
 		localStorage.setItem('expireIn', today.getTime().toString());
 	}
}
