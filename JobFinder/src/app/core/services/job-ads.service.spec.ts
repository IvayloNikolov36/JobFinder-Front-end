import { TestBed } from '@angular/core/testing';

import { JobAdsService } from './job-ads.service';

describe('OffersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobAdsService = TestBed.get(JobAdsService);
    expect(service).toBeTruthy();
  });
});
