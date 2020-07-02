import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesInfoComponent } from './languages-info.component';

describe('LanguagesInfoComponent', () => {
  let component: LanguagesInfoComponent;
  let fixture: ComponentFixture<LanguagesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
