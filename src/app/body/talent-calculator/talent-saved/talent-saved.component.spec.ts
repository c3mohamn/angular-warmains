import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSavedComponent } from './talent-saved.component';

describe('TalentSavedComponent', () => {
  let component: TalentSavedComponent;
  let fixture: ComponentFixture<TalentSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
