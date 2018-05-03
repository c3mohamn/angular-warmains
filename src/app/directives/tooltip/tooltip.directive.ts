import { ContentOptions, Offset } from './options.model';
import { HoveredContentComponent } from './content.component';
import {
  Component,
  Directive,
  Inject,
  ComponentFactoryResolver,
  Input,
  Output,
  ElementRef,
  ViewContainerRef,
  ComponentRef,
  EventEmitter,
  HostListener
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WindowRef } from '../../services/window.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Output()
  beforeShow: EventEmitter<TooltipDirective> = new EventEmitter<
    TooltipDirective
  >();
  @Output()
  show: EventEmitter<TooltipDirective> = new EventEmitter<TooltipDirective>();
  @Output()
  beforeHide: EventEmitter<TooltipDirective> = new EventEmitter<
    TooltipDirective
  >();
  @Output()
  hide: EventEmitter<TooltipDirective> = new EventEmitter<TooltipDirective>();
  @Input() public content: string;
  @Input() public ngToolTipClass: string;
  @Input() tooltipDisplayOffset: Offset;
  @Input() showOnClick = false;
  @Input() autoShowHide = true;
  @Input() position = 'bottom';

  private contentCmpRef: ComponentRef<HoveredContentComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef,
    private winRef: WindowRef,
    @Inject(DOCUMENT) private _document: any
  ) {}

  @HostListener('mouseenter', ['$event'])
  private onMouseHover(event: any) {
    if (!this.autoShowHide || this.showOnClick) {
      return;
    }
    this.buildTooltip(event);
  }

  @HostListener('mouseleave')
  public hideTooltip() {
    if (this.contentCmpRef) {
      this.beforeHide.emit(this);
      this.contentCmpRef.destroy();
      this.hide.emit(this);
    }
  }

  @HostListener('click', ['$event'])
  @HostListener('mousewheel', ['$event'])
  @HostListener('contextmenu', ['$event'])
  private rebuildTooltip(event: any): void {
    setTimeout(() => this.buildTooltip(event));
  }

  public showTooltip(options: ContentOptions) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      HoveredContentComponent
    );
    this.contentCmpRef = this._viewContainerRef.createComponent(
      componentFactory
    );
    this.beforeShow.emit(this);
    this._document
      .querySelector('body')
      .appendChild(this.contentCmpRef.location.nativeElement);
    this.contentCmpRef.instance.options = options;
    this.show.emit(this);
  }

  private buildTooltip(event: any) {
    const position = this.getPosition();
    const options: ContentOptions = {
      content: this.content,
      cls: this.ngToolTipClass,
      x: position[0] + 10,
      y: position[1] + 10,
      offset: this.tooltipDisplayOffset
    };
    this.hideTooltip();
    this.showTooltip(options);
  }

  private getPosition(): [number, number] {
    const eBounds = this._viewContainerRef.element.nativeElement.getBoundingClientRect();
    const left = eBounds.left,
      right = eBounds.right,
      top = eBounds.top,
      bottom = eBounds.bottom,
      width = eBounds.width,
      height = eBounds.height;

    // console.log(this.winRef.nativeWindow);

    switch (this.position) {
      case 'top':
        return [
          this.winRef.nativeWindow.scrollX + left - width / 2,
          this.winRef.nativeWindow.scrollY + top - height
        ];
      default:
        return [left - width / 2, top + height];
    }
  }
}
