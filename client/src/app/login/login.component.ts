import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userdata: any;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
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
          this.router.navigate(['']);
        } else {
          alert('Invalid credentials');
        }
      });
    }
  }
}
