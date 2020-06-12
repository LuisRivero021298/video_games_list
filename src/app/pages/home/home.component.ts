import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
	profile: UserModel;

  constructor( private _auth: AuthService ) {
  	this.profile = new UserModel({});
  }

  ngOnInit(): void {
  	this.getProfile();
  }

  getProfile() {
  	const token = this._auth.readToken();
  	this._auth.getUser(token).subscribe(
  		resp => {
  			this.profile = resp.data[0];
  		},
  		err => {
  			console.log(err);
  		}
  	)
  }

}
