import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserForm } from '../../_models/user.model';
import { Router } from '@angular/router';
import { ApiUserService } from '../../_services/user/api-user.service';
import { AuthService } from '../../_services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  user: UserForm;
  userForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  constructor(
    private _apiUserService: ApiUserService,
    private _authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.errorMsg = '';
    this.user = {
      email: '',
      username: '',
      password: ''
    };
  }

  createForm() {
    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginUser() {
    if (this.userForm.invalid) {
      this.errorMsg = 'Please enter values for username and password';
      return;
    }
    this.errorMsg = '';

    this.user.email = this.userForm.get('username').value;
    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;

    this._apiUserService.setUserToken(this.user)
      .subscribe(
        data => {
          this._authService.login(data);
          this.errorMsg = '';
          this.successMsg = `Successfully logged in as ${this.user.username}.`;
          setTimeout(() => {
            this.router.navigate(['./home']);
          }, 500);
        },
        error => {
          console.log(error);
          this.errorMsg = error.error;
        }
      );
  }

  getUsernameErrorMessage() {
    const username = this.userForm.get('username');
    return username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    const password = this.userForm.get('password');
    return password.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit() {
  }
}
