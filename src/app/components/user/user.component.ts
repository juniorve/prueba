import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 public listGenders: Array<object> =[
   {label:"Male", value:"M"},
   {label:"Female", value:"F"}
  ]
  public listCountries: Array<object> =[
    {label:"Uruguay", value:1},
    {label:"Perú", value:2}
   ]
  constructor() { }

  ngOnInit() {
  }

}
