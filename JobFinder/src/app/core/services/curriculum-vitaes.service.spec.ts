import { TestBed } from '@angular/core/testing';

import { CurriculumVitaesService } from './curriculum-vitaes.service';

describe('CurriculumVitaesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurriculumVitaesService = TestBed.get(CurriculumVitaesService);
    expect(service).toBeTruthy();
  });
});
