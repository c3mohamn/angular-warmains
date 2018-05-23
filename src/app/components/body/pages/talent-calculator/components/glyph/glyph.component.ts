import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Glyph } from '../../models/talents.model';
import { MatDialog } from '@angular/material';
import { GlyphsDialogComponent } from '../glyphs-dialog/glyphs-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-glyph',
  templateUrl: './glyph.component.html',
  styleUrls: ['./glyph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlyphComponent implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() type: string;
  @Input() classId: number;
  // @Output() addGlyph: new EventEmitter<Glyph>();
  // @Output() removeGlyph: newEventEmitter<Glyph>();
  glyph: Glyph;
  iconUrl = `url(./assets/images/UI-EmptyBack.png)`;

  constructor(public dialog: MatDialog) {}

  openGlyphsDialog(): void {
    const dialogRef = this.dialog.open(GlyphsDialogComponent, {
      width: '80%',
      minWidth: '300px',
      maxWidth: '1000px',
      maxHeight: '600px',
      data: { classId: this.classId, type: this.type }
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
