import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor (
  	private _auth: AuthService,
  	private _router: Router
  ) {}

  canActivate(): boolean {
    if (this._auth.isAuthenticated()) { 
        this._router.navigateByUrl('/home'); 
        return false;
      }
    return true;
  }
  
}