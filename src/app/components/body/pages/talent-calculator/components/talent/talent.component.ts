import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  HostListener
} from '@angular/core';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { Talent } from '../../models/talents.model';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit, OnChanges {
  iconUrl: string;
  classId: number;
  spec: string;
  lastActiveRow: number;
  pointsInTree: number[];
  tooltipContent: string;

  @Input() talent: Talent;

  constructor(private talentService: TalentCalculatorService) {}

  initTalent(): void {
    if (this.talent !== undefined) {
      this.classId = this.talentService.getClassId();
      this.spec = this.talentService.getClassSpec(
        this.talent.tree,
        this.classId
      );
      this.iconUrl = `url(assets/images/talent-icons/${this.classId}/${
        this.spec
      }/${this.talent.id}.jpg)`;
      this.talent.tooltip = this.talentService.getTalentTooltip(this.talent.id);
      if (this.talent.tooltip) {
        this.getTalentTooltip();
      }
    }
  }

  isInactive(): boolean {
    return this.talentService.isTalentActive(this.talent.id);
  }

  addTalentPoint() {
    this.talentService.addPoint(this.talent.id, 1);
    this.getTalentTooltip();
  }

  removeTalentPoint() {
    this.talentService.removePoint(this.talent.id, 1);
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

  ngOnChanges(changes: SimpleChanges) {
    const talent: SimpleChange = changes.talent;
    this.initTalent();
  }

  ngOnInit() {
    this.initTalent();
  }
}
