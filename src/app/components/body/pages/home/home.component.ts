import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta) {
    meta.addTag({ property: 'og:title', content: 'Home' });
    meta.addTag({ property: 'og:type', content: 'website' });
    meta.addTag({
      property: 'og:image',
      content: 'http://media.moddb.com/images/mods/1/28/27592/.5.jpg'
    });
    meta.addTag({
      property: 'og:description',
      content:
        'Talent, Character and Raid planner for World of Warcraft: Wrath of the Lich King.'
    });
    meta.addTag({ property: 'og:site_name', content: 'Warmains' });
  }

  ngOnInit() {}
}
