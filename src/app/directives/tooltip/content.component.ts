import { ContentOptions } from './options.model';

import { Component, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class HoveredContentComponent implements AfterViewInit {
  private _options: ContentOptions;

  constructor(private elRef: ElementRef) {}

  set options(op: ContentOptions) {
    this._options = op;
  }

  get options(): ContentOptions {
    return this._options;
  }

  ngAfterViewInit() {
    const tooltipBounds = this.elRef.nativeElement
      .querySelector('div.ng-tool-tip-content')
      .getBoundingClientRect();

    const tWidth = tooltipBounds.width,
      tHeight = tooltipBounds.height;

    switch (this.options.position) {
      case 'top':
        setTimeout(() => {
          this.options.x -= tWidth / 2;
          this.options.y -= tHeight;
        });
        break;
      case 'top-left':
        setTimeout(() => {
          this.options.x -= tWidth;
          this.options.y -= tHeight;
        });
        break;
      case 'top-right':
        setTimeout(() => {
          this.options.x += tWidth;
          this.options.y -= tHeight;
        });
        break;
      case 'right':
        setTimeout(() => {
          this.options.x += 50;
          this.options.y -= tHeight / 2;
        });
        break;
      case 'left':
        setTimeout(() => {
          this.options.x -= tWidth;
          this.options.y -= tHeight / 2;
        });
        break;
      case 'bottom':
        setTimeout(() => (this.options.x -= tWidth / 2));
        break;
      case 'bottom-left':
        setTimeout(() => (this.options.x -= tWidth));
        break;
      default:
        // bottom-right
        break;
    }
  }
}
