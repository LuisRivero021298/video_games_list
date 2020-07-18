import { Component, OnInit } from "@angular/core";
import { Page } from "../../interfaces/Page.interface";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { FilesService } from "src/app/services/files.service";

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
    private _files: FilesService
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
    this.user = vForm;
    //this._alert.loadingMessage('Wait a moment please');
    this._auth.newUser(this.user).subscribe(
      (data: any) => {
        //this._alert.closeAlert();
        this.rememberUser = true;
        this.rememberUsers();
        this._router.navigate(["/login"]);
      },
      (err: any) => {
        //alert('Error: '+err)
        console.log(err);
        //this._alert.errorMessage(err, 'Failed to authenticate');
      }
    );
  }

  rememberUsers() {
    if (this.rememberUser) {
      localStorage.setItem("email", this.user.email);
    }
  }
}
