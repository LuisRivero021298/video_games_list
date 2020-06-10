import { Component, OnInit } from '@angular/core';
import { Page } from '../../interfaces/Page.interface';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/Login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
	page: Page
  user: Login
  screenSize = {
    screenWidth: 0,
    screenHeigth: 0
  }

  constructor( 
    private _router : Router,
    private _auth : AuthService 
  ) {
  	this.page = {
  		title: 'log in',
  		action: 'log in',
  		page: 'login',
  		rememberUser: false
  	}
    this.user = { email: '', password: '' }
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;
    
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.page.rememberUser = true;
    }
  }

  login(vForm) {
    this.user.email = vForm.email;
    this.user.password = vForm.password;
    this.page.rememberUser = vForm.remember;

    this._auth.login(this.user).subscribe( 
      (data: any) => {
        //this._alert.closeAlert();
        this.rememberUsers();
        this._router.navigate(['/home']);
      },
      (err: any) => {
        //this._alert.errorMessage(err,'Failed to authenticate');
      }
    );
  }

  rememberUsers() {
    if ( this.page.rememberUser ) {
      localStorage.setItem('email', this.user.email);
    } 
  }

}
