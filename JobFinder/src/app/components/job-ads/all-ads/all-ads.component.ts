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
  jobAds: JobAd[];
  jobAdsSubscription: Subscription;

  categories$: Observable<object[]>;
  engagements$: Observable<object[]>;

  itemsCountArray = [5, 10, 15, 20, 30, 50, 100];
  locationsArray = ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven'];

  totalCount: number;
  activePage = 1;
  itemsCount = this.itemsCountArray[0];
  location = 'All';
  category: any = 'All';
  engagement: any = 'All';

  constructor(
    private jobAdsService: JobAdsService
  ) { }

  ngOnInit() {
    this.loadJobAds();

    this.categories$ = this.jobAdsService.getCategories();
    this.engagements$ = this.jobAdsService.getEngagements();
  }

  ngOnDestroy() {
    this.jobAdsSubscription.unsubscribe();
  }

  loadJobAds() {
    this.jobAdsSubscription = this.jobAdsService
    .getAll(this.activePage, this.itemsCount, this.location, this.category, this.engagement)
    .subscribe((data) => {
      this.jobAds = data;
      this.totalCount = data.length;
    });
  }

  loadActivePageItems(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.loadJobAds();
  }

  changeItemsCount(event) {
    this.itemsCount = event.target.value;
    this.loadJobAds();
  }

  changeFilterLocation(event) {
    this.location = event.target.value;
    this.loadJobAds();
  }

  changeFilterCategory(event) {
    this.category = event.target.value;
    this.loadJobAds();
  }

  changeFilterEngagement(event) {
    this.engagement = event.target.value;
    this.loadJobAds();
  }
}
