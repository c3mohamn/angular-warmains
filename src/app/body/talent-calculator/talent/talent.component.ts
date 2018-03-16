import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, HostListener } from '@angular/core';
import { TalentCalculatorService } from '../talent-calculator.service';
import { Talent } from '../_models/talents.model';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit, OnChanges {
  iconUrl: string;
  classId: number;
  spec: string;

  @Input() talent: Talent;

  constructor(
    private talentService: TalentCalculatorService
  ) {
  }

  initTalent(): void {
    if (this.talent !== undefined) {
      this.classId = this.talentService.getClassId();
      this.spec = this.talentService.getClassSpec(this.talent.tree, this.classId);
      this.iconUrl = `url(assets/images/talent-icons/${this.classId}/${this.spec}/${this.talent.id}.jpg)`;
      this.talent.tooltip = this.talentService.talentTooltips[this.talent.id];
    }
  }

  addTalentPoint() {
    this.talentService.addPoint(this.talent.id, 1);
  }

  removeTalentPoint() {
    // if (this.talent.curRank === 0) {
    //   return false;
    // }

    this.talentService.removePoint(this.talent.id, 1);
    return false;
  }

  ngOnChanges(changes: SimpleChanges) {
    const talent: SimpleChange = changes.talent;
    this.initTalent();
  }

  ngOnInit() {
    this.initTalent();
  }
}
