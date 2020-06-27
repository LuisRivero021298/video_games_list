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
  createList() {
    const { value: nameList } = Swal.fire({
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
  }
}
