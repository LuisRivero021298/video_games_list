import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AlertsService {
  constructor() {}

  error(message: string = "") {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
  success(message: string = "") {
    Swal.fire({
      icon: "success",
      title: message,
    });
  }

  create() {
    return new Promise(async (resolve, reject) => {
      const { value: nameList } = await Swal.fire({
        title: "Enter list name",
        input: "text",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });
      if (nameList) {
        return resolve(nameList);
      }
    });
  }

  loading() {
    Swal.fire({
      allowOutsideClick: false,
      title: "Loading...",
      icon: "info",
    });
    Swal.showLoading();
  }

  closeAlert() {
    Swal.close();
  }
}
