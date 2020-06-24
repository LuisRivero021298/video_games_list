import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
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

  constructor(private _auth: AuthService, private _router: Router) {
    this.profile = new UserModel({
      username: "patricia123",
      email: "patricia123@gmail.com",
      photo: "node_js_hexagon-wallpaper-1920x1200.jpg",
      birthdate: "1997-06-04T05:00:00.000Z",
    });
  }

  ngOnInit(): void {
    this.getProfile();
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

  goEditProfile() {
    this._router.navigateByUrl("/edit-profile");
  }
}
