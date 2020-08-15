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

  page: number;
  items: number;
  searchText: string;
  location: string;
  category: number;
  engagement: number;
  sortBy: string;
  isAscending: boolean;

  constructor(
    private jobsService: JobAdsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.jobDetails = this.route.snapshot.data['singleJob'];
    this.page = +this.route.snapshot.queryParamMap.get('page');
    this.items = +this.route.snapshot.queryParamMap.get('items');
    this.searchText = this.route.snapshot.queryParamMap.get('searchText');
    this.location = this.route.snapshot.queryParamMap.get('location');
    this.category = +this.route.snapshot.queryParamMap.get('category');
    this.engagement = +this.route.snapshot.queryParamMap.get('engagement');
    this.sortBy = this.route.snapshot.queryParamMap.get('sortBy');
    this.isAscending = this.route.snapshot.queryParamMap.get('isAscending') === 'true' ? true : false;
  }

}
