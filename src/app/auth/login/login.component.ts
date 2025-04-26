import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantDef } from '~/app/core/constantDef';
import { ServicesService } from '~/app/core/services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isChangePos: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private services: ServicesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const data = {
        username: this.loginForm.value?.username.trim(),
        password: this.loginForm.value?.password.trim(),
      };
      this.spinner.show();
      this.services.login(data).subscribe(
        (data: any) => {
          if (data.status == ConstantDef.STATUS_SUCCES) {
            this.router.navigate(['/home']);
            this.spinner.hide();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
