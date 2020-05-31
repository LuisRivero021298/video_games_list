import { Component, OnInit } from '@angular/core';
import { Page } from '../../interfaces/Page.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
	page : Page;
  rememberUser: boolean = false;
  user: UserModel = {
    username: 'luisda021298',
    email: 'luisda021298@gmail.com',
    password: '123123123',
    birthdate: '2020/03/03',
    photo: ''
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { 
  	this.page = {
  		title: 'register',
  		action: 'register',
  		page: 'register',
      rememberUser: false
  	}
  }

  ngOnInit(): void {
  }

  registerNew( vForm: UserModel ) {
      this.user = vForm;
      this.user.photo = this.getFile(vForm);

      console.log(this.user);
      
      //this._alert.loadingMessage('Wait a moment please');

      this._auth.newUser(this.user).subscribe( 
        (data:any) => {
          console.log(data);
          //this._alert.closeAlert();
          this.rememberUser = true;
          this.rememberUsers();
          this._router.navigate(['/home']);
        },
        (err: any) => {
          console.log(err);
          //this._alert.errorMessage(err, 'Failed to authenticate');
      });
    }

    rememberUsers() {
      if ( this.rememberUser ) {
        localStorage.setItem('email', this.user.email);
      } 
    }

    private getFile(vForm: UserModel) {
      let largeUrl = vForm.photo;
      let file = largeUrl.split("\\");
      let fileName = file[2];
      return fileName;
    }
}
