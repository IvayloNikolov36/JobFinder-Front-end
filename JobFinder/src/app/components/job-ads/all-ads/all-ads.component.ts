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
  categories$: Observable<object[]>;
  engagements$: Observable<object[]>;
  searchText = '';

  jobAds: JobAd[];
  totalCount: number;

  JobAdsSubscription: Subscription;

  itemsCountArray = [5, 10, 15, 20, 30, 50, 100];
  locationsArray = ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven'];
  activePage = 1;
  itemsCount = this.itemsCountArray[0];
  location = 'All';
  category = 0;
  engagement = 0;
  sortBy = 'Published';
  isAscending = false;
  showFilters = false;
  buttonText = 'Show Filters';

  constructor(
    private jobAdsService: JobAdsService
  ) { }

  ngOnInit() {
    this.loadJobAds();
    this.categories$ = this.jobAdsService.getCategories();
    this.engagements$ = this.jobAdsService.getEngagements();
  }

  ngOnDestroy() {
    this.JobAdsSubscription.unsubscribe();
  }

  loadJobAds() {
    this.JobAdsSubscription = this.jobAdsService
      .getAll(this.activePage, this.itemsCount, this.searchText, this.location, this.category,
        this.engagement, this.sortBy, this.isAscending).subscribe((data) => {
        this.totalCount = parseInt(data['totalCount'], 10);
        this.jobAds = data['data'];
      });
  }

  searchJob() {
    this.loadJobAds();
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
    console.log(event.target.value);
    this.loadJobAds();
  }

  changeFilterEngagement(event) {
    this.engagement = event.target.value;
    this.loadJobAds();
  }

  changeSortBy(event) {
    this.sortBy = event.target.value;
    this.loadJobAds();
  }

  changeOrder(event) {
    const value = event.target.value;
    value === 'ASC' ? this.isAscending = true : this.isAscending = false;
    this.loadJobAds();
  }

  showOrHideFilters() {
    this.showFilters = !this.showFilters;
    this.buttonText === 'Show Filters'
    ? this.buttonText = 'Hide Filters'
    :  this.buttonText = 'Show Filters';
  }
}
