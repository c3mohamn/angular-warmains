import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TalentService } from '../../../../../../modules/api/services/talent.service';
import { Glyph } from '../../models/talents.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-glyphs-dialog',
  templateUrl: './glyphs-dialog.component.html',
  styleUrls: ['./glyphs-dialog.component.scss']
})
export class GlyphsDialogComponent implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  classId: number;
  type: number;
  glyphs: Glyph[];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<GlyphsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private talentService: TalentService
  ) {
    this.loading = true;
    this.classId = data.classId;
    this.type = data.type;
    this.talentService
      .getGlyphDetails(this.classId, this.type)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        glyphs => {
          console.log(glyphs);
          this.glyphs = glyphs;
          this.loading = false;
        },
        error => console.log(error)
      );
  }

  closeDialog(): void {
    console.log('closing dialog');
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
