import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { Talent } from '../../models/talents.model';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';
import { TalentCalculatorService } from '../../services/talent-calculator.service';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit, OnChanges {
  tooltipContent: string;

  @Input() talent: Talent; // set default talents
  @Input() classId = 1;
  iconUrl = `url(assets/images/UI-EmptyBack.png)`;
  spec = '';

  constructor(
    private talentCalculatorFacade: TalentCalculatorFacade,
    private talentCalculatorService: TalentCalculatorService
  ) {}

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
    // event emitter
    this.getTalentTooltip();
  }

  removeTalentPoint() {
    // event emitter
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
