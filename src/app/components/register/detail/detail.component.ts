import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from "sweetalert";
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 public listGenders: Array<object> =[
   {label:"Male", value:"M"},
   {label:"Female", value:"F"}
  ];

  public listCountries: Array<object> =[
    {label:"Uruguay", value:1},
    {label:"Perú", value:2}
   ];

  public detailForm; 
  
  constructor(private fb: FormBuilder, private registerService:RegisterService) { 
    this.detailForm = this.fb.group({
      full_name:["",Validators.required],
     	birthday:[null, Validators.required],
	    gender:["M",Validators.required],
      country:[1,Validators.required],
      phone:["", Validators.required],
	    bio:["",Validators.maxLength(256)]
    });
  }

  ngOnInit() {
  }

  saveDetail(){
    console.log(this.detailForm.value);
    this.registerService.newDetail(this.detailForm.value).subscribe(
      res=>{
        if(res.register){
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
