import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserForm } from '../../../models/user.model';
import { UserService } from '../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    });
  }

  registerUser({ value, valid }) {
    if (valid) {
      const user: UserForm = {
        email: value.email,
        username: value.username,
        password: value.password
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
            this.apiErrorMsg = 'Something went wrong: ' + error.error;
          }
        );
    }
  }

  getErrorMessage(inputName: string): string {
    const input = this.userForm.get(inputName);

    return input.hasError('required')
      ? 'You must enter a value'
      : input.hasError('email')
      ? 'Not a valid email'
      : input.hasError('minLength')
      ? 'Username be greater than 2 characters'
      : input.hasError('maxlength')
      ? 'You must enter a value'
      : '';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
