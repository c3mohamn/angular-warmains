import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../services/users/api-user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  users: User[];

  constructor(private _apiUserService: ApiUserService) {
    this._apiUserService.getUsers()
      .subscribe(res => {
        this.users = res;
        console.log(this.users);
      });
  }

  ngOnInit() {
  }

}
