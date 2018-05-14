import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountOptionsComponent {
  @Input() accountOptionsActive: boolean;
  @Input() username = '';
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();

  constructor() {}

  logoutUser() {
    this.logout.emit();
    this.toggleEvent.emit(false);
  }

  closeDropdown() {
    this.accountOptionsActive = false;
    this.toggleEvent.emit(this.accountOptionsActive);
  }
}
