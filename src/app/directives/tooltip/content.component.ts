import { ContentOptions } from './options.model';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';

@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class HoveredContentComponent implements AfterViewInit {
  private _options: ContentOptions;

  constructor(private elRef: ElementRef, public safeHtml: SafeHtmlPipe) {}

  set options(op: ContentOptions) {
    this._options = op;
  }

  get options(): ContentOptions {
    return this._options;
  }

  ngAfterViewInit() {
    const tooltipBounds = this.elRef.nativeElement.querySelector('div.ng-tool-tip-content').getBoundingClientRect();

    const tWidth = tooltipBounds.width,
      tHeight = tooltipBounds.height;

    switch (this.options.position) {
      case 'top':
        requestAnimationFrame(() => {
          this.options.x -= tWidth / 2;
          this.options.y -= tHeight;
        });
        break;
      case 'top-left':
        requestAnimationFrame(() => {
          this.options.x -= tWidth;
          this.options.y -= tHeight;
        });
        break;
      case 'top-right':
        requestAnimationFrame(() => {
          this.options.x += tWidth;
          this.options.y -= tHeight;
        });
        break;
      case 'right':
        requestAnimationFrame(() => {
          this.options.x += 50;
          this.options.y -= tHeight / 2;
        });
        break;
      case 'left':
        requestAnimationFrame(() => {
          this.options.x -= tWidth;
          this.options.y -= tHeight / 2;
        });
        break;
      case 'bottom':
        requestAnimationFrame(() => (this.options.x -= tWidth / 2));
        break;
      case 'bottom-left':
        requestAnimationFrame(() => (this.options.x -= tWidth));
        break;
      default:
        // bottom-right
        break;
    }
  }
}
