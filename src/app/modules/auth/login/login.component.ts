import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { UserForm } from '../../../models/user.model';
import { UserFacade } from '../../state/user/user.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  hidePassword = true;
  userForm: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.userFacade
      .getUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.errorMsg = data.error;
        this.successMsg = data.success;
      });
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

    const user: UserForm = {
      email: this.userForm.get('username').value,
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value
    };

    this.userFacade.loginUser(user);
  }

  getUsernameErrorMessage() {
    const username = this.userForm.get('username');
    return username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    const password = this.userForm.get('password');
    return password.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
