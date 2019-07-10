import { HoveredContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, HoveredContentComponent, SafeHtmlPipe],
  exports: [TooltipDirective],
  providers: [SafeHtmlPipe],
  entryComponents: [HoveredContentComponent]
})
export class TooltipModule {}
