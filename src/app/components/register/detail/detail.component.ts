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
    {label:"Perú", value:2},
    {label:"Chile", value:3},
    {label:"Ecuador", value:4},
    {label:"México", value:5},
    {label:"Inglarerra", value:6},
    {label:"Rusia", value:7},
    {label:"Nicaragua", value:8},
    {label:"España", value:9},
    {label:"Bolivia", value:10}
   ];

  public detailForm; 
  
  constructor(private fb: FormBuilder, private registerService:RegisterService) { 
    this.detailForm = this.fb.group({
      full_name:["Homero Simpson",Validators.required],
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
        console.log(res);

        if(res.success==true){
          swal("Good job!", 
          "Detail recorded successfully", "success");
        }else{
          swal("Error!",
          "The data was not saved", "success");
        }
      },
      err=>{
        swal("Error", err, "warning");
      }
    );
  }

}
