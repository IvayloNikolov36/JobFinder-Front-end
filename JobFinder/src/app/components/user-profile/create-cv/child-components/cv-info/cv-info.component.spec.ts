import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvInfoComponent } from './cv-info.component';

describe('CvInfoComponent', () => {
  let component: CvInfoComponent;
  let fixture: ComponentFixture<CvInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
