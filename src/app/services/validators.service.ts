import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  equalPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      console.log(pass1Name, pass2Name );
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEqual: true });
      }
    }
  }

  dateExists(fecha) {
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year,month,0);
    if((day-0)>(date.getDate()-0)){
          return false;
    }
    return true;
  }
}
