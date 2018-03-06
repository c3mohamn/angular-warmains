import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentCalculatorComponent } from './talent-calculator.component';

describe('TalentCalculatorComponent', () => {
  let component: TalentCalculatorComponent;
  let fixture: ComponentFixture<TalentCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
