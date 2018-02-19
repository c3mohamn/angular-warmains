import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  currentState() {
    return window.location.pathname.slice(1);
  }

  ngOnInit() {
  }

}
