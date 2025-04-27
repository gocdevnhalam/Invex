import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantDef } from '~/app/core/constantDef';
import { ServicesService } from '~/app/core/services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
declare var $: any;
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
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      checkRemember: [false],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.services.getUserData(token).subscribe(
        (data: any) => {
          if (data.status == ConstantDef.STATUS_SUCCES) {
            const username = data.response.username;
            this.loginForm.patchValue({
              username: username,
              checkRemember: true,
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

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
            if (this.loginForm.value.checkRemember) {
              localStorage.setItem('token', data.response?.access);
            } else {
              localStorage.removeItem('token');
            }
            this.router.navigate(['/home']);
            this.spinner.hide();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      if (!this.loginForm.controls['username'].valid) {
      }
      if (!this.loginForm.controls['password'].valid) {
        this.messageService.add({
          severity: 'error',
          detail: 'password không hợp lệ',
        });
      }
      if (!this.loginForm.controls['username'].valid) {
        this.messageService.add({
          severity: 'error',
          detail: 'username không hợp lệ',
        });
      }
    }
  }
  inputValue(event: any) {
    if (event.value == '') {
      $(`#${event.id}`).addClass('invalid');
    } else {
      $(`#${event.id}`).removeClass('invalid');
    }
  }
}
