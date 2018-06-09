import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Glyph } from '../../models/talents.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-glyph',
  templateUrl: './glyph.component.html',
  styleUrls: ['./glyph.component.scss']
})
export class GlyphComponent implements OnChanges {
  @Input() glyph: Glyph = null;
  iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
  tooltipContent: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    const glyph = changes.glyph;
    if (glyph && glyph.currentValue) {
      this.iconUrl = `url('http://wow.zamimg.com/images/wow/icons/large/${glyph.currentValue.icon.toLowerCase()}.jpg')`;
    } else {
      this.iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
    }
    this.tooltipContent = this.getTooltip(this.glyph);
  }

  getBackgroundImage(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.iconUrl);
  }

  getTooltip(glyph: Glyph): string {
    let name = '<h3><small>Empty</small></h3>';
    let icon = `<img class="icon" src="assets/images/UI-EmptyBack.png"/>`;
    let description = '';
    let clickTo = `<span class="click-to-learn">Click to add a glyph.</span>`;

    if (glyph) {
      name = `<h5>${glyph.name}</h5>`;
      icon = `<img class="icon" src="http://wow.zamimg.com/images/wow/icons/large/${glyph.icon.toLowerCase()}.jpg"/>`;
      description = glyph.description;
      clickTo = `<span class="click-to-remove">Right click to remove.</span>`;
    }

    return `
      <div class="tooltip-talent grid-y">
        ${icon}
        <div class="cell flex-container">
          <div class="flex-child-shrink name">${name}</div>
        </div>
        <div class="cell description">
          ${description}
        </div>
        <div class="cell click-to">
          ${clickTo}
        </div>
      </div>
    `;
  }
}
