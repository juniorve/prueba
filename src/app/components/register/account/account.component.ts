import { Component, OnInit } from '@angular/core';
import swal from "sweetalert";
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public accountForm; 
  
  constructor(private fb: FormBuilder, private registerService:RegisterService) { 
    this.accountForm = this.fb.group({
      user_name:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
	    password:["",Validators.required],
      confirm_password:["",Validators.required],
      terms:[null, Validators.required]
    });
  }

  ngOnInit() {
  }

  saveAccount(){
    console.log(this.accountForm.value);
    this.registerService.newAcount(this.accountForm.value).subscribe(
      res=>{
        if(res.account){
          swal("Good job!", 
          "Detail recorded successfully", "success");
        }
       console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

}
