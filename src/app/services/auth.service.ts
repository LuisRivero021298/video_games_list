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
    console.log(token);
    let headers = new HttpHeaders().set('x-access-token', idUser);
    return this._http.get<any>(this.url+'/profile', { headers });

  }

  newUser(newUser: UserModel): Observable<any> {
  	let newU = JSON.stringify(newUser);
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');

  	return this._http.post<any>(
      this.url+'/register', newU, { headers }
    ).pipe(
     map( resp => {
       console.log('enter in map')
       this.saveToken(resp.data)
       return resp
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
        console.log('enter in map')
        this.saveToken(resp.data)
        return resp
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
  }
  
  readToken() {
    let tokenStorage = localStorage.getItem('token');
    return (tokenStorage) ? this.userToken = tokenStorage : this.userToken = null;
  }

  isAuthenticated() : boolean {
    return (this.userToken !== null && this.userToken !== undefined) ? true : false
  }

  private saveToken(idToken:string) {
 		this.userToken = idToken;
 		localStorage.setItem('token', idToken);

 		//this.saveTokenExpires(expireIn);
 	}

 	private saveTokenExpires(expireIn:number) {
 		let today = new Date();
 		today.setSeconds(expireIn);
 		localStorage.setItem('expireIn', today.getTime().toString());
 	}
}
