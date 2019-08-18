import { AccountComponent } from './account/account.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { RegisterRoutingModule, registerRoutingProviders } from './register-routing.module';
import { DetailComponent } from './detail/detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../../services/error.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { RegisterService } from 'src/app/services/register.service';

@NgModule({
  declarations: [DetailComponent, AccountComponent, NewRegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[RegisterService,registerRoutingProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'es-Pe'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
})
export class RegisterModule { }
