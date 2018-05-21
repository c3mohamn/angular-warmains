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

  ngOnChanges(changes: SimpleChanges) {
    const talents = changes.talents;
    this.talent = this.talents[0];
    this.requires = this.talents[1];

    if (talents && talents.currentValue[0]) {
      this.iconUrl = `url(./assets/images/talent-icons/${
        this.talent.iconPath
      }.jpg)`;
      this.getTalentTooltip();
    }
  }

  addTalentPoint() {
    this.addPoint.emit(this.talent);
    this.getTalentTooltip();
  }

  removeTalentPoint() {
    this.removePoint.emit(this.talent);
    this.getTalentTooltip();
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

  private getTalentTooltip() {
    const talentName = `<h5>${this.talent.name}</h5>`;
    const tooltipRank = `<h5>${this.talent.curRank}/${
      this.talent.maxRank
    }</h5>`;
    const talentIcon = `<img class="icon" src="assets/images/talent-icons/${
      this.talent.iconPath
    }.jpg"/>`;
    let currentRankDescription = '';
    let nextRankDescription = '';
    let clickTo = '';
    let nextRank = '';

    if (this.talent.curRank === 0) {
      clickTo = `<span class="click-to-learn">Click or scroll up to learn.</span>`;
      currentRankDescription = this.talent.tooltip[this.talent.curRank];

      if (this.isDisabled || this.totalPoints === 71) {
        clickTo = '';
      }
    } else if (this.talent.curRank < this.talent.maxRank) {
      currentRankDescription = this.talent.tooltip[this.talent.curRank - 1];
      nextRankDescription = this.talent.tooltip[this.talent.curRank];
      nextRank = `<div class="next-rank">Next rank:</div>`;
    } else {
      clickTo = `<span class="click-to-remove">Right click or scroll down to remove.</span>`;
      currentRankDescription = this.talent.tooltip[this.talent.curRank - 1];
    }

    this.tooltipContent = `<div class="tooltip-talent grid-y">
      ${talentIcon}
      <div class="cell flex-container">
        <div class="flex-child-shrink name">${talentName}</div>
        <div class="flex-child-grow"></div>
        <div class="flex-child-shrink rank">${tooltipRank}</div>
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
