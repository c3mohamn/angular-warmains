import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TalentCalculatorFacade } from '../state/talent-calculator/talent-calculator.facade';
import { RouterFacade } from '../state/router/router.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ClassUtil } from '../../utils/class.util';

@Component({
  selector: 'app-talent-calculator',
  templateUrl: './talent-calculator.component.html',
  styleUrls: ['./talent-calculator.component.scss']
})
export class TalentCalculatorComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  classId = 1;
  classTalentTreeSpecNames: string[];

  constructor(
    private title: Title,
    private talentCalculatorFacade: TalentCalculatorFacade,
    private router: Router,
    private routerFacade: RouterFacade,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.routerFacade
      .getCurrentState()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.classId = data.params.classId;
        this.isValidClassId(this.classId);
        this.talentCalculatorFacade.loadTalents(this.classId, data.queryParams.talents, data.queryParams.glyphs);
        this.title.setTitle(`Talents | ${ClassUtil.getClassName(this.classId)}`);
        this.classTalentTreeSpecNames = ClassUtil.getClassTalentTreeSpecNames(this.classId);
      });

    this.addMetaTags();
  }

  addMetaTags() {
    this.meta.addTag({ property: 'og:title', content: 'Talents' });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({
      property: 'og:image',
      content: 'http://media.moddb.com/images/mods/1/28/27592/.5.jpg'
    });
    this.meta.addTag({
      property: 'og:description',
      content: 'Create and save your talents using the talent calculator.'
    });
    this.meta.addTag({ property: 'og:site_name', content: 'Warmains' });
  }

  isValidClassId(classId: any): void {
    if ((classId && isNaN(classId)) || classId === 10 || classId > 11 || classId < 1) {
      // not valid a number, redirect to base class
      this.router.navigate(['/talent/1']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
