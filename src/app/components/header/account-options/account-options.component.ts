import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent implements OnInit {
  @Input() accountOptionsActive: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  getCurrentUsername() {
    return this._authService.getUsername();
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
