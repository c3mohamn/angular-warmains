import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-talent-glyphs',
  templateUrl: './talent-glyphs.component.html',
  styleUrls: ['./talent-glyphs.component.scss']
})
export class TalentGlyphsComponent implements OnDestroy {
  @Input() classId = 1;

  constructor() {}

  ngOnDestroy() {}
}
