import { Component, OnInit } from '@angular/core';
import swal from "sweetalert";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { PasswordValidator } from '../../../validators/password.validator';
import { UserNameValidator } from '../../../validators/username.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  validPassword;
  public accountForm;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.accountForm = this.fb.group({
      user_name: ["", Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), //solo numeros y letras
        UserNameValidator.checkUsername, // unico en el sistema
        Validators.required])],
        email: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        terms: [false,Validators.pattern('true')],
        password_group: new FormGroup({
          password: new FormControl('', Validators.compose([
             Validators.minLength(5),
             Validators.required,
             Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
          ])),
          confirm_password: new FormControl('', Validators.required)
        }, (formGroup: FormGroup) => {
           return PasswordValidator.isIdentical(formGroup);
        })
    });
  }

  ngOnInit() {
  }

  saveAccount() {
    if(this.accountForm.valid){
      let data:any = {};
      data.user_name = this.accountForm.controls["user_name"].value;
      data.terms = this.accountForm.controls["terms"].value;
      data.password = this.accountForm.controls["password_group"].controls["password"].value;
      data.confirm_password = this.accountForm.controls["password_group"].controls["confirm_password"].value;
      data.email =  this.accountForm.controls["email"].value;
  
      this.registerService.newAcount(data).subscribe(
        res => {
          if (res.success==true) {
            swal("Good job!",
              "Detail recorded successfully", "success");
          }else{
            swal("Error!",
              "The data was not saved", "success");
          }
          console.log(res);
        },
        err => {
          swal("Error", err, "warning");
        }
      );
    }
  }

  //MENSAJES PARA LAS VALIDACIONES
  messagesValitations = {
    'user_name': [
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'checkUsername', message: 'user already registered' },
      { type: 'required', message: 'Username is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'terms': [
      { type: 'pattern', message: 'accept the terms and conditions' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'isIdentical', message: 'passwords do not match' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }

}
