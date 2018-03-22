import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from './talent-calculator.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-talent-calculator',
  templateUrl: './talent-calculator.component.html',
  styleUrls: ['./talent-calculator.component.scss']
})
export class TalentCalculatorComponent implements OnInit {
  classId: number;

  constructor(
    private talentService: TalentCalculatorService,
    private router: Router,
    private meta: Meta
  ) {
    this.talentService.init();
    meta.addTag({ property: 'og:title', content: 'Talents' });
    meta.addTag({ property: 'og:type', content: 'website' });
    meta.addTag({ property: 'og:image', content: 'http://media.moddb.com/images/mods/1/28/27592/.5.jpg' });
    meta.addTag({
      property: 'og:description',
      content: 'Create and save your talents using the talent calculator.'
    });
    meta.addTag({ property: 'og:site_name', content: 'Warmains' });
  }

  ngOnInit() {
  }

}
