import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserForm } from '../../../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../api/services/user.service';

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
    private userService: UserService,
    private authService: AuthService,
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

    this.userService.setUserToken(this.user).subscribe(
      data => {
        this.authService.login(data);
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

  ngOnInit() {}
}
