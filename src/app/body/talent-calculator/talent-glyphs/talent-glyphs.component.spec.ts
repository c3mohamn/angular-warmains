import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentGlyphsComponent } from './talent-glyphs.component';

describe('TalentGlyphsComponent', () => {
  let component: TalentGlyphsComponent;
  let fixture: ComponentFixture<TalentGlyphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentGlyphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentGlyphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
