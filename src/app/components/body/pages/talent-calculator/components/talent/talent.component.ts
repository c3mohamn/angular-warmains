import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Talent } from '../../models/talents.model';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentComponent implements OnChanges {
  @Input() talents: [Talent, Talent]; // talent, requires
  @Input() preview = [];
  @Input() totalPoints = 0;
  @Output() addPoint = new EventEmitter<Talent>();
  @Output() removePoint = new EventEmitter<Talent>();
  iconUrl = `url(./assets/images/UI-EmptyBack.png)`;
  tooltipContent: string;
  isDisabled = false;
  talent: Talent;
  requires: Talent;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const talents = changes.talents;
    this.talent = this.talents[0];
    this.requires = this.talents[1];

    if (talents && talents.currentValue[0]) {
      this.iconUrl = `url(./assets/images/talent-icons/${
        this.talent.iconPath
      }.jpg)`;
      this.tooltipContent = this.getTooltip(this.talent);
    }
  }

  addTalentPoint(): void {
    this.addPoint.emit(this.talent);
    this.tooltipContent = this.getTooltip(this.talent);
  }

  removeTalentPoint(): boolean {
    this.removePoint.emit(this.talent);
    this.tooltipContent = this.getTooltip(this.talent);
    return false;
  }

  isInactive(): boolean {
    if (this.talent) {
      const pointsInTree = this.preview[this.talent.tree];

      if (this.talent.requires) {
        if (this.requires.curRank !== this.requires.maxRank) {
          return true;
        }
      }

      return (
        this.talent.row * 5 > pointsInTree ||
        (this.talent.curRank === 0 && this.totalPoints === 71)
      );
    }

    return true;
  }

  /**
   * Return the html tooltip content for talent.
   * @param talent Talent
   */
  private getTooltip(talent: Talent): string {
    const name = `<h5>${talent.name}</h5>`;
    const rank = `<h5>${talent.curRank}/${talent.maxRank}</h5>`;
    const icon = `<img class="icon" src="assets/images/talent-icons/${
      talent.iconPath
    }.jpg"/>`;
    let currentRankDescription = '';
    let nextRankDescription = '';
    let clickTo = '';
    let nextRank = '';

    if (talent.curRank === 0) {
      clickTo = `<span class="click-to-learn">Click or scroll up to learn.</span>`;
      currentRankDescription = talent.tooltip[talent.curRank];

      if (this.isDisabled || this.totalPoints === 71) {
        clickTo = '';
      }
    } else if (talent.curRank < talent.maxRank) {
      currentRankDescription = talent.tooltip[talent.curRank - 1];
      nextRankDescription = talent.tooltip[talent.curRank];
      nextRank = `<div class="next-rank">Next rank:</div>`;
    } else {
      clickTo = `<span class="click-to-remove">Right click or scroll down to remove.</span>`;
      currentRankDescription = talent.tooltip[talent.curRank - 1];
    }

    return `
      <div class="tooltip-talent grid-y">
        ${icon}
        <div class="cell flex-container">
          <div class="flex-child-shrink name">${name}</div>
          <div class="flex-child-grow"></div>
          <div class="flex-child-shrink rank">${rank}</div>
        </div>
        <div class="cell description">
          ${currentRankDescription}
          ${nextRank}
          ${nextRankDescription}
        </div>
        <div class="cell click-to">
          ${clickTo}
        </div>
      </div>
    `;
  }
}
