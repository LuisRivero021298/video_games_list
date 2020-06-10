import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor( 
  	private _auth: AuthService,
  	private _router: Router 
  ) { }

  ngOnInit(): void {
  	
  }

  signOut(){
  	this._auth.logOut();
  	this._router.navigateByUrl('/login');
  }

}
