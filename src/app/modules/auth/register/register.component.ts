import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { UserForm } from '../../../models/user.model';
import { UserService } from '../../api/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class RegisterComponent implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  hidePassword = true;
  userRegistered = false;
  apiErrorMsg = '';
  successMsg = '';
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])
    });
  }

  registerUser() {
    if (this.userForm.invalid) {
      this.apiErrorMsg = 'Invalid form.';
      return;
    }

    const user: UserForm = {
      email: this.userForm.get('email').value,
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value
    };

    this.userService
      .createUser(user)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          console.log('user registered! ', data);
          this.userRegistered = true;
          this.successMsg = `${data.username} has been registered!`;
        },
        error => {
          console.log('error ', error);
          this.apiErrorMsg = error.error;
        }
      );
  }

  // Form error messages
  // --------------------
  getEmailErrorMessage() {
    const email = this.userForm.get('email');

    return this.userForm.get('email').hasError('required')
      ? 'You must enter a value'
      : email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getUsernameErrorMessage() {
    const username = this.userForm.get('username');

    return username.hasError('minlength')
      ? 'Username be greater than 2 characters'
      : username.hasError('maxlength')
        ? 'Username be less than 21 characters'
        : username.hasError('required')
          ? 'You must enter a value'
          : '';
  }

  getPasswordErrorMessage() {
    const password = this.userForm.get('password');

    return password.hasError('minlength')
      ? 'Password be greater than 4 characters'
      : password.hasError('maxlength')
        ? 'Password must be less than 21 characters'
        : password.hasError('required')
          ? 'You must enter a value'
          : '';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
