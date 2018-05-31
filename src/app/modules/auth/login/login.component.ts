import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserForm } from '../../../models/user.model';
import { UserFacade } from '../../state/user/user.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  loginUser({ value, valid }) {
    if (valid) {
      this.errorMsg = '';

      console.log(value, valid);

      const user: UserForm = {
        email: value.username,
        username: value.username,
        password: value.password
      };

      this.userFacade.loginUser(user);
    }
  }

  getErrorMessage(inputName: string): string {
    const input = this.userForm.get(inputName);
    return input.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
