import { ContentOptions } from './options.model';

import { Component, AfterContentChecked, ElementRef } from '@angular/core';
@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class HoveredContentComponent implements AfterContentChecked {
  private _options: ContentOptions;

  constructor(private elRef: ElementRef) {}

  set options(op: ContentOptions) {
    this._options = op;
  }

  get options(): ContentOptions {
    return this._options;
  }

  ngAfterContentChecked() {
    const toolTipWidth: number = this.elRef.nativeElement.querySelector(
      'div.ng-tool-tip-content'
    ).offsetWidth;
    if (window.innerWidth < toolTipWidth + this.options.x) {
      this.options.x = this.options.x - toolTipWidth;
    }
    if (this.options.offset && this.options.offset.x) {
      this.options.x += this.options.offset.x;
    }
    if (this.options.offset && this.options.offset.y) {
      this.options.y += this.options.offset.y;
    }
  }
}
