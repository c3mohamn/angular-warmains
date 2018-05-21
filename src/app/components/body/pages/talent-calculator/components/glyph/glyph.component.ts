import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Glyph } from '../../models/talents.model';

@Component({
  selector: 'app-glyph',
  templateUrl: './glyph.component.html',
  styleUrls: ['./glyph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent {
  @Input() type: string;
  glyph: Glyph;

  iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
  constructor() {}
}
