import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantDef } from '~/app/core/constantDef';
import { ServicesService } from '~/app/core/services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isChangePos: boolean = false;
  visible: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private services: ServicesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      checkRemember: [false],
    });
  }

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const a = this.authService.isTokenExpired(accessToken);
      console.log(a);
    }

    if (accessToken && !this.authService.isTokenExpired(accessToken)) {
      this.services.getUserData(accessToken).subscribe(
        (data: any) => {
          console.log('getUserData success:', data);
          if (data.status == ConstantDef.STATUS_SUCCES) {
            const username = data.response.username;
            this.loginForm.patchValue({
              username: username,
              checkRemember: true,
            });
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          });
        }
      );
    } else {
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
              const access = data.response?.access;
              const refresh = data.response?.refresh;
              this.authService.setTokens(access, refresh);
            } else {
              localStorage.removeItem('token');
            }
            this.router.navigate(['/home']);
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.visible = true;
          }
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
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
