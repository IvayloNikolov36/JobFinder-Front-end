import { JobDetails } from './../../../core/models/job-details';
import { JobAdsService } from 'src/app/core/services/job-ads.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetails: JobDetails;

  constructor(
    private jobsService: JobAdsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.jobDetails = this.route.snapshot.data['singleJob'];
  }

}
