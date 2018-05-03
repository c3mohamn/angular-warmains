import { HoveredContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, HoveredContentComponent],
  exports: [TooltipDirective],
  entryComponents: [HoveredContentComponent]
})
export class TooltipModule {}
