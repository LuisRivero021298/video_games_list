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
  rememberUser: boolean = false
  user: UserModel
  screenSize = {
    screenWidth: 0,
    screenHeigth: 0
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
    this.user = new UserModel({});
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;
  }

  registerNew( vForm: UserModel ) {
    this.user = vForm;
    this.user.photo = this.getFile(vForm);
    this.user.birthdate = this.formatDate(this.user.birthdate);
    

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
        //alert('Error: '+err)
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

  private formatDate(date) {
    let formatDate = '';
    formatDate = Object.values(date).join('-');

    return formatDate;
  }
}
