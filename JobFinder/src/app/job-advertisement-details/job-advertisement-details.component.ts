import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../models/job-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jf-job-advertisement-details',
  templateUrl: './job-advertisement-details.component.html',
  standalone: false
})
export class JobAdvertisementDetailsComponent implements OnInit {

  // TODO: complete the details of the job adv

  jobDetails!: JobDetails;

  page!: number;
  items!: number;
  searchText!: string;
  location!: string | null;
  category!: number;
  engagement!: number;
  sortBy!: string | null;
  isAscending!: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // TODO: refactor
    this.jobDetails = this.route.snapshot.data['singleJob']; // TODO: fix to get job details
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') ?? '1');
    this.items = parseInt(this.route.snapshot.queryParamMap.get('items') ?? '10');
    this.searchText = this.route.snapshot.queryParamMap.get('searchText') ?? '';
    this.location = this.route.snapshot.queryParamMap.get('location');
    this.category = parseInt(this.route.snapshot.queryParamMap.get('category') ?? '0');
    this.engagement = parseInt(this.route.snapshot.queryParamMap.get('engagement') ?? '0');
    this.sortBy = this.route.snapshot.queryParamMap.get('sortBy');
    this.isAscending = this.route.snapshot.queryParamMap.get('isAscending') === 'true' ? true : false;
  }
}
