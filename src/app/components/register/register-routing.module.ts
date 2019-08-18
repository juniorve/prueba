import { NewRegisterComponent } from './new-register/new-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   
      { path: 'new-register', component: NewRegisterComponent}
];

export const registerRoutingProviders: any[] = [];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegisterRoutingModule {}

 

