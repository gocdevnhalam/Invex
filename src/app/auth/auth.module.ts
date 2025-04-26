import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class AuthModule {}
