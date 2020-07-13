import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { UserModel } from "../../models/user.model";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: [],
})
export class EditProfileComponent implements OnInit {
  page: Page;
  user: UserModel;
  screenSize = {
    screenWidth: 0,
    screenHeigth: 0,
  };
  constructor(private _auth: AuthService) {
    this.page = {
      title: "Edit Profile",
      action: "Edit Profile",
      page: "edit",
      rememberUser: false,
    };
    this.getUser();
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;
  }

  getUser() {
    const birthdate = this.getBirthday();
    this.user = new UserModel({
      username: localStorage.getItem("username"),
      photo: localStorage.getItem("photo"),
      birthdate: birthdate,
    });
  }

  private getBirthday() {
    let birthdate = localStorage.getItem("birthdate");
    let [birth] = birthdate.split("T");
    let [yearS, monthS, dayS] = birth.split("-");
    let year = parseInt(yearS);
    let month = parseInt(monthS);
    let day = parseInt(dayS);
    let birthObjet = {
      year,
      month,
      day,
    };

    return birthObjet;
  }
}
