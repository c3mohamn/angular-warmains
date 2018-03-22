import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentTreeComponent } from './talent-tree.component';

describe('TalentTreeComponent', () => {
  let component: TalentTreeComponent;
  let fixture: ComponentFixture<TalentTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
