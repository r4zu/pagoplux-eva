import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userdata: any;
  private _snackBar = inject(MatSnackBar);

  constructor(private builder: FormBuilder, private service: AuthService) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
        ),
      ])
    ),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.ProceedLogin(this.loginForm.value).subscribe((result) => {
        this.userdata = result;
        if (this.userdata['token']) {
          sessionStorage.setItem('token', this.userdata.token);
          window.location.href = '/';
        } else {
          this.openSnackBar('Invalid credentials', 'Close');
        }
      });
    } else {
      this.openSnackBar('Please enter valid data.', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
