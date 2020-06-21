import { Component, OnInit } from '@angular/core';
import { Page } from '../../interfaces/Page.interface';
import { UserModel } from '../../models/user.model';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: []
})
export class EditProfileComponent implements OnInit {
    page: Page;
    user: UserModel;
    screenSize = {
        screenWidth: 0,
        screenHeigth: 0
    }
    constructor() {
        this.page = {
            title: 'Edit Profile',
            action: 'Edit Profile',
            page: 'edit',
            rememberUser: false
        };

        this.user = new UserModel({
            username:'',
            email: '',
            password: '', photo: '',
            birthdate: ''});
        
    }

  ngOnInit(): void {
      this.screenSize.screenWidth = screen.width;
      this.screenSize.screenHeigth = screen.height;
  }

}
