import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentHeaderComponent } from './talent-header.component';

describe('TalentHeaderComponent', () => {
  let component: TalentHeaderComponent;
  let fixture: ComponentFixture<TalentHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
