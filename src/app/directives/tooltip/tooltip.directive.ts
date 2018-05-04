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
import { WINDOW } from '../../services/window.service';

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
  @Input() position = 'bottom-right';
  @Input() padding = 10;

  private contentCmpRef: ComponentRef<HoveredContentComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      HoveredContentComponent
    );
    this.contentCmpRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    this.beforeShow.emit(this);
    this.document
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
      x: position[0],
      y: position[1],
      offset: this.tooltipDisplayOffset,
      position: this.position
    };
    this.hideTooltip();
    this.showTooltip(options);
  }

  private getPosition(): [number, number] {
    const eBounds = this.viewContainerRef.element.nativeElement.getBoundingClientRect();
    const left = eBounds.left,
      right = eBounds.right,
      top = eBounds.top,
      bottom = eBounds.bottom,
      width = eBounds.width,
      height = eBounds.height,
      padding = this.padding;

    const scrollYOffset =
      this.window.scrollY ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    const scrollXOffset =
      this.window.scrollX ||
      this.document.documentElement.scrollLeft ||
      this.document.body.scrollLeft ||
      0;

    switch (this.position) {
      case 'top':
        return [
          scrollXOffset + left + width / 2,
          scrollYOffset + top - padding
        ];
      case 'top-left':
        return [scrollXOffset + left + width, scrollYOffset + top - padding];
      case 'top-right':
        return [scrollXOffset + left, scrollYOffset + top - padding];
      case 'right':
        return [
          scrollXOffset + left + width + padding,
          scrollYOffset + top + height / 2
        ];
      case 'left':
        return [
          scrollXOffset + left - padding,
          scrollYOffset + top + height / 2
        ];
      case 'bottom':
        return [
          scrollXOffset + left + width / 2,
          scrollYOffset + top + height + padding
        ];
      case 'bottom-left':
        return [
          scrollXOffset + left + width,
          scrollYOffset + top + height + padding
        ];
      default:
        // bottom-right
        return [scrollXOffset + left, scrollYOffset + top + height + padding];
    }
  }
}
