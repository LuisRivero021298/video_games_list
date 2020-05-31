import { Component, OnInit } from '@angular/core';
import { Page } from '../../interfaces/Page.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
	page: Page;
  user = {
    email: '',
    password: '',
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
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.page.rememberUser = true;
    }
    console.log(this.user);
  }

  login(vForm){
    console.log(vForm);

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
