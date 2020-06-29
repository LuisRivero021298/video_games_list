import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ListService } from "../../services/list.service";
import { UserModel } from "../../models/user.model";
import { ListModel } from "../../models/list.model";
import { Router } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  profile: UserModel;
  lists: Array<ListModel>;
  errorlist: string;
  url = "http://localhost:3000/api";

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _list: ListService,
    private _alert: AlertsService
  ) {
    this.profile = new UserModel({
      username: "",
      email: "",
      photo: "",
      birthdate: "",
    });

    this.lists = [];
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLists() {
    const token = this._auth.readToken();
    this._list.getListsByUser(token).subscribe(
      (resp: any) => {
        this.lists = this.organizeListData(resp.data.response);
      },
      (err) => {
        this.errorlist = err.error.message;
      }
    );
  }

  createLists() {
    const token = this._auth.readToken();
    this._alert
      .create()
      .then((value: string) => {
        let newList = {
          name_list: value,
          id_user: token,
        };
        this._list.addList(newList).subscribe(
          (resp: any) => {
            this._router.navigate(["list"], resp.data.id);
          },
          (err) => console.error(err)
        );
      })
      .catch((err) => console.error(err));
  }

  goEditProfile() {
    this._router.navigateByUrl("/edit-profile");
  }

  private organizeListData(resp: Array<any>) {
    let data = [];

    for (let i = 0; i < resp.length; i++) {
      data.push(
        new ListModel(resp[i].id_list, resp[i].name_list, resp[i].photo_list)
      );
    }
    return data;
  }
}
