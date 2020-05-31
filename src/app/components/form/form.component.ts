import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder,
         FormArray} from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { Page } from '../../interfaces/Page.interface';
import { UserModel } from '../../models/user.model';
import M from 'node_modules/materialize-css';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {
  @Input() page: Page;
  @Input() user: any;

  @Output() vForm: EventEmitter<UserModel>;

	form: FormGroup;
	valid: Array<Validators> = [];
	

  constructor( private _fb: FormBuilder, private _validator: ValidatorsService ) {
  	this.valid = [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ];
    this.vForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.formCreate();
    this.loadData();
  }

  get usernameEmpty(){
    return this.form.get('username').value;
  }

  get emailEmpty(){
    return this.form.get('email').value;
  }

  get passwordEmpty(){
    return this.form.get('password').value;
  }

  get birthdateEmpty(){
    return this.form.get('birthdate').value;
  }

  get usernameInvalid(){
    return this.form.get('username').invalid &&
           this.form.get('username').touched;
  }

  get emailInvalid(){
    return this.form.get('email').invalid &&
           this.form.get('email').touched;
  }

  get passwordInvalid(){
    return this.form.get('password').invalid &&
           this.form.get('password').touched;
  }

  get birthdateInvalid(){
    return this.form.get('birthdate').invalid &&
           this.form.get('birthdate').touched;
  }

  formCreate() {
    console.log(this.page.page);
    if(this.page.page === 'register') {

      this.form = this._fb.group({
        username:  ['', 
          [
            this.valid[0], 
            this.valid[1]
            //this._validator.userExists
          ]
        ],
        email: ['',
          [
            this.valid[0], 
            this.valid[2]
          ] 
        ],
        password: ['', 
          [
            this.valid[0],
            this.valid[1]
          ]
        ],
        birthdate: ['', 
          [
            this.valid[0],
          ]
        ],
        photo: [''],
        
      },{ 
          validateDateExist: this._validator.dateExists('birthdate')
      }); 
    } else {
      this.form = this._fb.group({
        email: ['',
          [
            this.valid[0], 
            this.valid[2]
          ] 
        ],
        password: ['', 
          [
            this.valid[0],
            this.valid[1]
          ]
        ],
        remember: ['']
      });
    }
  } //end formCreate

  validateForm(){
    (this.form.invalid) ? this.showInvalids(this.form) : this.vForm.emit(this.form.value);
  } //end validateForm

  loadData(){
    if (this.page.page === 'login') { 
      this.form.reset(this.user) 
      console.log(this.form.controls.remember.value);
      this.form.controls.remember.value = this.page.rememberUser;
    };
  } //end loadData

  showInvalids(validate: FormGroup){
    if( validate.invalid ) {
      return Object.values(validate.controls).forEach( 
        control => {

          if( control instanceof FormGroup ) {
            Object.values(control.controls).forEach(
              control => { 
                control.markAsTouched(); 
              }
            )
          } else { control.markAsTouched(); }
        
        }
      )
    }
  }

}
