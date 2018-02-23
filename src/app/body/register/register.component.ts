import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);
  confirmPassword = new FormControl('', [Validators.required]);
  hidePassword = true;

  constructor() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('minlength') ? 'Username be greater than 2 characters' :
      this.username.hasError('maxlength') ? 'Username be less than 21 characters' :
        this.username.hasError('required') ? 'You must enter a value' :
          '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('minlength') ? 'Password be greater than 4 characters' :
      this.password.hasError('maxlength') ? 'Password must be less than 21 characters' :
        this.password.hasError('required') ? 'You must enter a value' :
          '';
  }

  ngOnInit() {
  }

}
