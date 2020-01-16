import { JobAd } from './../../../core/models/job-ad';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JobAdsService } from './../../../core/services/job-ads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit {
  jobAds$: Observable<JobAd[]>;
  activePage = 1;
  itemsCount = 2;

  constructor(
    private jobAdsService: JobAdsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jobAds$ = this.jobAdsService.getAll(this.activePage, this.itemsCount);
  }

  loadActivePageItems(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.jobAds$ = this.jobAdsService.getAll(this.activePage, this.itemsCount);
  }

}
