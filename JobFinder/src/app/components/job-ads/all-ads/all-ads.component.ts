import { JobAd } from './../../../core/models/job-ad';
import { Observable, Subscription } from 'rxjs';
import { JobAdsService } from './../../../core/services/job-ads.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit, OnDestroy {
  jobAds$: Observable<JobAd[]>;
  totalCountSubscription: Subscription;
  totalCount: number;
  activePage = 1;
  itemsCount = 2;

  constructor(
    private jobAdsService: JobAdsService
  ) { }

  ngOnInit() {
    this.jobAds$ = this.jobAdsService.getAll(this.activePage, this.itemsCount);
    this.totalCountSubscription = this.jobAdsService.getCount().subscribe((data) => {
      this.totalCount = parseInt(data['count'], 10);
    });

  }

  ngOnDestroy() {
    this.totalCountSubscription.unsubscribe();
  }

  loadActivePageItems(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.jobAds$ = this.jobAdsService.getAll(this.activePage, this.itemsCount);
  }

}
