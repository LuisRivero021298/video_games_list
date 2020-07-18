import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { ValidatorsService } from "../../services/validators.service";
import { Page } from "../../interfaces/Page.interface";
import { UserModel } from "../../models/user.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FilesService } from "src/app/services/files.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styles: [],
})
export class FormComponent implements OnInit {
  @Input() page: Page;
  @Input() user: UserModel;
  @Input() screenSize;

  @Output() vForm: EventEmitter<object>;

  form: FormGroup;
  valid: Array<Validators> = [];
  file: Array<File>;

  constructor(
    private _fb: FormBuilder,
    private _files: FilesService,
    private _validator: ValidatorsService
  ) {
    this.valid = [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
    ];
    this.vForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.formCreate();
    this.loadData();
  }

  formCreate() {
    if (this.page.page === "register") {
      this.formRegister();
    } else if (this.page.page === "login") {
      this.formLogin();
    } else {
      this.formEdit();
    }
  }

  validateForm() {
    this.form.invalid ? this.showInvalids(this.form) : this.sendData();
  }

  loadData() {
    if (this.page.page === "login") {
      this.form.reset(this.user);
      this.form.controls["remember"].setValue(this.page.rememberUser);
    }
  }

  async sendData() {
    if (this.file) {
      let fileUploaded = await this.uploadFile(this.file);

      if (fileUploaded === "err") {
        alert("No submit image");
        return;
      }

      this.form.value.photo = fileUploaded;
    }

    if (this.form.value.birthdate) {
      this.form.value.birthdate = this.formatDate(this.form.value.birthdate);
    }

    this.vForm.emit(this.form.value);
  }

  uploadFile(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file0", file[i], file[i].name);
      }

      this._files.uploadFile(formData).subscribe(
        (resp: any) => {
          return resolve(resp.data.fileComplete);
        },
        (err) => {
          console.log(err);
          reject("err");
        }
      );
    });
  }

  onFileChange(e) {
    this.file = e.target.files;
  }

  private formatDate(date) {
    let formatDate = "";
    formatDate = Object.values(date).join("-");

    return formatDate;
  }

  private showInvalids(validate: FormGroup) {
    if (validate.invalid) {
      return Object.values(validate.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  private formRegister() {
    this.form = this._fb.group({
      username: ["", [this.valid[0], this.valid[1]]],
      email: ["", [this.valid[0], this.valid[2]]],
      password: ["", [this.valid[0], this.valid[1]]],
      birthdate: ["", [this.valid[0]]],
      photo: [""],
    });
  }

  private formLogin() {
    this.form = this._fb.group({
      email: ["", [this.valid[0], this.valid[2]]],
      password: ["", [this.valid[0], this.valid[1]]],
      remember: [""],
    });
  }

  private formEdit() {
    this.form = this._fb.group({
      username: [this.user.username, [this.valid[0], this.valid[1]]],
      birthdate: [this.user.birthdate, this.valid[0]],
      photo: [""],
    });
  }

  get usernameEmpty() {
    return this.form.get("username").value;
  }

  get emailEmpty() {
    return this.form.get("email").value;
  }

  get passwordEmpty() {
    return this.form.get("password").value;
  }

  get birthdateEmpty() {
    return this.form.get("birthdate").value;
  }

  get usernameInvalid() {
    return (
      this.form.get("username").invalid && this.form.get("username").touched
    );
  }

  get emailInvalid() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get passwordInvalid() {
    return (
      this.form.get("password").invalid && this.form.get("password").touched
    );
  }

  get birthdateInvalid() {
    return (
      this.form.get("birthdate").invalid && this.form.get("birthdate").touched
    );
  }
}
