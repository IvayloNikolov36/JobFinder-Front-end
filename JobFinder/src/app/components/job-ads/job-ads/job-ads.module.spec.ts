import { JobAdsModule } from './job-ads.module';

describe('JobAdsModule', () => {
  let jobAdsModule: JobAdsModule;

  beforeEach(() => {
    jobAdsModule = new JobAdsModule();
  });

  it('should create an instance', () => {
    expect(jobAdsModule).toBeTruthy();
  });
});
