import { Component, OnDestroy, Input } from '@angular/core';
import { Glyph } from '../../models/talents.model';

@Component({
  selector: 'app-talent-glyphs',
  templateUrl: './talent-glyphs.component.html',
  styleUrls: ['./talent-glyphs.component.scss']
})
export class TalentGlyphsComponent implements OnDestroy {
  @Input() classId = 1;

  constructor() {}

  addGlyph(glyph: Glyph): void {
    console.log('adding', glyph);
  }

  removeGlyph(glyph: Glyph): void {
    console.log('removing', glyph);
  }

  ngOnDestroy() {}
}
