import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent implements OnInit {
  username: string;

  @Input() accountOptionsActive: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor(private _authService: AuthService) {
    this.username = this._authService.user.username;
  }

  ngOnInit() {
  }

  logoutUser() {
    this._authService.logout();
    this.toggleEvent.emit(false);
  }

  closeDropdown() {
    this.accountOptionsActive = false;
    this.toggleEvent.emit(this.accountOptionsActive);
  }
}
