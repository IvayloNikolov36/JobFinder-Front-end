import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCertificatesComponent } from './courses-certificates.component';

describe('CoursesCertificatesComponent', () => {
  let component: CoursesCertificatesComponent;
  let fixture: ComponentFixture<CoursesCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
