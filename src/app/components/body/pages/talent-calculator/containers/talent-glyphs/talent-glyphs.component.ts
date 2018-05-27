import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Glyph } from '../../models/talents.model';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-talent-glyphs',
  templateUrl: './talent-glyphs.component.html',
  styleUrls: ['./talent-glyphs.component.scss']
})
export class TalentGlyphsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() classId = 1;
  glyphs: Glyph[] = [];

  constructor(private talentCalculatorFacade: TalentCalculatorFacade) {}

  ngOnInit(): void {
    this.talentCalculatorFacade
      .getGlyphs()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.glyphs = data));
  }

  addGlyph(glyph: Glyph, index: number): void {
    this.talentCalculatorFacade.addGlyph(glyph, index);
  }

  removeGlyph(index): void {
    this.talentCalculatorFacade.removeGlyph(index);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
