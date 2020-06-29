import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumVitaesComponent } from './curriculum-vitaes.component';

describe('CurriculumVitaesComponent', () => {
  let component: CurriculumVitaesComponent;
  let fixture: ComponentFixture<CurriculumVitaesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumVitaesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumVitaesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
