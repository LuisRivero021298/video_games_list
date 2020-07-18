import { UserModel } from "./../../models/user.model";
import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AlertsService } from "src/app/services/alerts.service";

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

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _alert: AlertsService
  ) {
    this.page = {
      title: "log in",
      action: "Login",
      page: "login",
      rememberUser: false,
    };
    this.user = new UserModel({});
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;

    if (localStorage.getItem("email")) {
      this.user.email = localStorage.getItem("email");
      this.page.rememberUser = true;
    }
  }

  login(vForm: any) {
    this.user.email = vForm.email;
    this.user.password = vForm.password;

    this.page.rememberUser = vForm.remember;
    this._auth.login(this.user).subscribe(
      () => {
        this.rememberUsers();
        this._router.navigate(["/home"]);
      },
      () => {
        this._alert.error("Failed to authenticate");
      }
    );
  }

  rememberUsers() {
    if (this.page.rememberUser) {
      localStorage.setItem("email", this.user.email);
    }
  }
}
