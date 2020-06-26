import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ListService } from "../../services/list.service";
import { UserModel } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  profile: UserModel;
  url = "http://localhost:3000/api";

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _list: ListService
  ) {
    this.profile = new UserModel({
      username: "",
      email: "",
      photo: "",
      birthdate: "",
    });
  }

  ngOnInit(): void {
    this.getProfile();
    this.getLists();
  }

  getProfile() {
    const token = this._auth.readToken();
    this._auth.getUser(token).subscribe(
      (resp) => {
        this.profile = resp;
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLists() {
    const token = this._auth.readToken();
    this._list.getListsByUser(token).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goEditProfile() {
    this._router.navigateByUrl("/edit-profile");
  }
}
