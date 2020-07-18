import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ListService } from "../../services/list.service";
import { UserModel } from "../../models/user.model";
import { ListModel } from "../../models/list.model";
import { Router } from "@angular/router";
import { AlertsService } from "../../services/alerts.service";
import Swal from "sweetalert2";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  profile: UserModel;
  lists: Array<ListModel>;
  url: string;
  token: string;

  constructor(
    private _g: GlobalService,
    private _auth: AuthService,
    private _router: Router,
    private _list: ListService,
    private _alert: AlertsService
  ) {
    this.url = this._g.getUrl();
    this.profile = new UserModel({ });
    this.lists = [];
  }

  ngOnInit(): void {
    this.token = this._auth.readToken();
    this.getProfile();
    this.getLists();
  }

  getProfile() {
    this._auth.getUser(this.token).subscribe(
      (resp) => {
        this.profile = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLists() {
    this._list.getListsByUser(this.token).subscribe(
      (resp: any) => {
        console.log(resp);
        this.lists = this.organizeListData(resp.data.response);
      },
      (err) => {
        console.error(err.error.message);
      }
    );
  }

  createLists() {
    this._alert
      .create()
      .then((value: string) => {
        const newList = {
          name_list: value,
          id_user: this.token,
        };

        this._list.addList(newList).subscribe(
          (resp: any) => {
            const { id } = resp;
            this._router.navigateByUrl(`/list/${id}`);
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
    const data = [];

    for (let i = 0; i < resp.length; i++) {
      data.push(
        new ListModel(resp[i].id_list, resp[i].name_list, resp[i].photo_list)
      );
    }
    return data;
  }
}
