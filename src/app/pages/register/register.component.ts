import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { AlertsService } from "src/app/services/alerts.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  page: Page;
  rememberUser: boolean = false;
  user: UserModel;
  screenSize = {
    screenWidth: 0,
    screenHeigth: 0,
  };

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _alert: AlertsService
  ) {
    this.page = {
      title: "register",
      action: "Register",
      page: "register",
      rememberUser: false,
    };
    this.user = new UserModel({});
  }

  ngOnInit(): void {
    this.screenSize.screenWidth = screen.width;
    this.screenSize.screenHeigth = screen.height;
  }

  async registerNew(vForm: any) {
    this._alert.loading();

    this.user = vForm;
    this._auth.newUser(this.user).subscribe(
      () => {
        this.rememberUser = true;
        this.rememberUsers();
        this._alert.closeAlert();
        this._alert.success("Your profile has been created");
        this._router.navigate(["/login"]);
      },
      () => {
        this._alert.error(
          "There was a problem, your profile could not be created"
        );
      }
    );
  }

  rememberUsers() {
    if (this.rememberUser) {
      localStorage.setItem("email", this.user.email);
    }
  }
}
