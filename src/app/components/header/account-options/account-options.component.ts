import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { UserFacade } from '../../../modules/state/user/user.facade';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountOptionsComponent implements OnInit {
  @Input() accountOptionsActive: boolean;
  @Input() username = '';
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  logoutUser() {
    this.logout.emit();
    this.toggleEvent.emit(false);
  }

  closeDropdown() {
    this.accountOptionsActive = false;
    this.toggleEvent.emit(this.accountOptionsActive);
  }
}
