import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { UserModel } from "../../models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { FilesService } from "src/app/services/files.service";
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
  constructor(private _auth: AuthService, private _files: FilesService) {
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

  async editUser(vForm: any) {
    const idUser = localStorage.getItem("token");

    let data = vForm;
    this.user = data;

    if (this.user.photo === "") {
      this.user.photo = localStorage.getItem("photo");
    }
    console.log(data);

    this._auth.updateUser(this.user, idUser).subscribe(
      (r) => {
        this._auth.saveUserInStorage(data.username, data.photo, data.birthdate);
      },
      (e) => console.error(e)
    );
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
