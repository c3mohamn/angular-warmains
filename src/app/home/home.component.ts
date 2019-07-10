import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.addMetaTags();
  }

  addMetaTags(): void {
    this.meta.addTag({ property: 'og:title', content: 'Home' });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({
      property: 'og:image',
      content: 'http://media.moddb.com/images/mods/1/28/27592/.5.jpg'
    });
    this.meta.addTag({
      property: 'og:description',
      content:
        'Talent, Character and Raid planner for World of Warcraft: Wrath of the Lich King.'
    });
    this.meta.addTag({ property: 'og:site_name', content: 'Warmains' });
  }
}
