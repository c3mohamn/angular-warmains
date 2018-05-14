import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Talent } from '../../models/talents.model';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { canAddPoint } from '../../helpers/talent-tree.helper';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentComponent implements OnInit, OnChanges {
  @Input() talent: Talent;
  @Input() classId = 1;
  @Output() addPoint = new EventEmitter<Talent>();
  @Output() removePoint = new EventEmitter<Talent>();
  iconUrl = `url(assets/images/UI-EmptyBack.png)`;
  spec = '';
  tooltipContent: string;

  constructor(private talentCalculatorService: TalentCalculatorService) {}

  ngOnChanges(changes: SimpleChanges) {
    const talent = changes.talent;

    if (
      talent &&
      talent.currentValue &&
      talent.currentValue !== talent.previousValue
    ) {
      // get spec of talent && iconUrl
      this.spec = this.talentCalculatorService.getClassSpec(
        this.talent.tree,
        this.classId
      );
      this.iconUrl = `url(./assets/images/talent-icons/${this.classId}/${
        this.spec
      }/${this.talent.id}.jpg)`;
      this.getTalentTooltip();
    }

    if (this.talent && this.classId) {
    }
  }

  ngOnInit() {}

  isInactive(): boolean {
    return false;
    // return this.talentService.isTalentActive(this.talent.id);
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

  private getTalentTooltip() {
    const talentName = `<h5>${this.talent.name}</h5>`;
    const tooltipRank = `<h5>${this.talent.curRank}/${
      this.talent.maxRank
    }</h5>`;
    const talentIcon = `<img class="icon" src="assets/images/talent-icons/${
      this.classId
    }/${this.spec}/${this.talent.id}.jpg"/>`;
    let currentRankDescription = '';
    let nextRankDescription = '';
    let clickTo = '';
    let nextRank = '';

    if (this.talent.curRank === 0) {
      clickTo = `<span class="click-to-learn">Click or scroll up to learn.</span>`;
      currentRankDescription = this.talent.tooltip[this.talent.curRank];

      if (this.isInactive()) {
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
