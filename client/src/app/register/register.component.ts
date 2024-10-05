import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private _snackBar = inject(MatSnackBar);

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  registerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
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

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service
        .ProceedRegister(this.registerForm.value)
        .subscribe((result) => {
          this.openSnackBar('Registered successfully.', 'Close');
          this.router.navigate(['login']);
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
