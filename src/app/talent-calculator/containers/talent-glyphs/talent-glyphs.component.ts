import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Glyph } from '../../models/talents.model';
import { TalentCalculatorFacade } from '../../../state/talent-calculator/talent-calculator.facade';
import { GlyphsDialogComponent } from '../../components/glyphs-dialog/glyphs-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-talent-glyphs',
  templateUrl: './talent-glyphs.component.html',
  styleUrls: ['./talent-glyphs.component.scss']
})
export class TalentGlyphsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() classId = 1;
  glyphs: Glyph[] = [];

  constructor(
    public dialog: MatDialog,
    private talentCalculatorFacade: TalentCalculatorFacade
  ) {}

  ngOnInit(): void {
    this.talentCalculatorFacade
      .getGlyphs()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.glyphs = data));
  }

  addGlyph(glyph: Glyph, index: number): void {
    this.talentCalculatorFacade.addGlyph(glyph, index);
  }

  removeGlyph(index): boolean {
    this.talentCalculatorFacade.removeGlyph(index);
    return false;
  }

  openGlyphsDialog(index: number): void {
    const type = index > 2 ? 2 : 1;
    const dialogRef = this.dialog.open(GlyphsDialogComponent, {
      width: '80%',
      minWidth: '300px',
      maxWidth: '1000px',
      maxHeight: '600px',
      data: { classId: this.classId, type: type }
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((glyph: Glyph) => {
        if (glyph) {
          this.addGlyph(glyph, index);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
