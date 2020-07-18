import { UserModel } from './../../models/user.model';
import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  page: Page;
  user: UserModel;
  screenSize = {
    screenWidth: 0,
    screenHeigth: 0,
  };

  constructor(private _router: Router, private _auth: AuthService) {
    this.page = {
      title: "log in",
      action: "Login",
      page: "login",
      rememberUser: false,
    };
    this.user = new UserModel({ });
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;

    if (localStorage.getItem("email")) {
      this.user.email = localStorage.getItem("email");
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
        this._router.navigate(["/home"]);
      },
      (err: any) => {
        console.log(err);
        //this._alert.errorMessage(err,'Failed to authenticate');
      }
    );
  }

  rememberUsers() {
    if (this.page.rememberUser) {
      localStorage.setItem("email", this.user.email);
    }
  }
}
