import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { JobAdsService } from 'src/app/core/services/job-ads.service';
import { JobDetails } from './../models/job-details';
import { Injectable } from '@angular/core';

@Injectable()
export class JobDetailsResolver implements Resolve<JobDetails> {

  constructor(private jobsService: JobAdsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];

    return this.jobsService.details(id);
  }
}
