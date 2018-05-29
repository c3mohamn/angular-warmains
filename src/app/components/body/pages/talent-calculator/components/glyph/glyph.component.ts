import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { Glyph } from '../../models/talents.model';
import { MatDialog } from '@angular/material';
import { GlyphsDialogComponent } from '../glyphs-dialog/glyphs-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-glyph',
  templateUrl: './glyph.component.html',
  styleUrls: ['./glyph.component.scss']
})
export class GlyphComponent implements OnChanges, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @Input() type: string;
  @Input() classId: number;
  @Input() glyph: Glyph = null;
  @Output() add = new EventEmitter<Glyph>();
  @Output() remove = new EventEmitter<void>();
  iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
  tooltipContent: string;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    const glyph = changes.glyph;
    if (glyph && glyph.currentValue) {
      this.iconUrl = `url('http://wow.zamimg.com/images/wow/icons/large/${glyph.currentValue.icon.toLowerCase()}.jpg')`;
    } else {
      this.iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
    }
    this.tooltipContent = this.getTooltip(this.glyph);
  }

  getBackgroundImage(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.iconUrl);
  }

  getTooltip(glyph: Glyph): string {
    let name = '<h3><small>Empty</small></h3>';
    let icon = `<img class="icon" src="assets/images/UI-EmptyBack.png"/>`;
    let description = '';
    let clickTo = `<span class="click-to-learn">Click to add a glyph.</span>`;

    if (glyph) {
      name = `<h5>${glyph.name}</h5>`;
      icon = `<img class="icon" src="http://wow.zamimg.com/images/wow/icons/large/${glyph.icon.toLowerCase()}.jpg"/>`;
      description = glyph.description;
      clickTo = `<span class="click-to-remove">Right click to remove.</span>`;
    }

    return `
      <div class="tooltip-talent grid-y">
        ${icon}
        <div class="cell flex-container">
          <div class="flex-child-shrink name">${name}</div>
        </div>
        <div class="cell description">
          ${description}
        </div>
        <div class="cell click-to">
          ${clickTo}
        </div>
      </div>
    `;
  }

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
        if (result) {
          this.addGlyph(result);
        }
      });
  }

  addGlyph(glyph: Glyph): void {
    this.add.emit(glyph);
  }

  removeGlyph(): boolean {
    if (this.glyph) {
      this.remove.emit();
    } else {
      console.log('no glyph to remove...', this.glyph);
    }

    return false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
