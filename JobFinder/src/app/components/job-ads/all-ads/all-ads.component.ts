import { DataListing } from './../../../core/models/common/data-listing';
import { JobAd } from './../../../core/models/job-ad';
import { Observable, Subscription } from 'rxjs';
import { JobAdsService } from './../../../core/services/job-ads.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';

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

  jobAdsSubscription: Subscription;

  itemsCountArray = [5, 10, 15, 20, 30, 50, 100];
  locationsArray = ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven'];
  activePage = 1;
  initialPage = 1;
  itemsCount = this.itemsCountArray[0];
  location = 'All';
  category = 0;
  engagement = 0;
  sortBy = 'Published';
  isAscending = false;
  showFilters = false;
  buttonText = 'Show Filters';

  constructor(private jobAdsService: JobAdsService) { }

  ngOnInit() {
    this.getJobAds();
    this.categories$ = this.jobAdsService.getCategories();
    this.engagements$ = this.jobAdsService.getEngagements();
  }

  ngOnDestroy() {
    this.jobAdsSubscription.unsubscribe();
  }

  getJobAds() {
    this.jobAdsSubscription = this.jobAdsService
      .all(this.activePage, this.itemsCount, this.searchText, this.location,
        this.category, this.engagement, this.sortBy, this.isAscending)
      .pipe(
        tap((data) => console.log(data))
      )
      .subscribe((data: DataListing<JobAd>) => {
        this.totalCount = data.totalCount;
        this.jobAds = data.data;
      });
  }

  loadActivePageItems(activePageNumber: number, hasFilteringOrSorting: boolean) {
    this.activePage = activePageNumber;
    if (activePageNumber !== this.initialPage || hasFilteringOrSorting) {
      this.getJobAds();
    }
  }

  searchJob() {
    this.loadActivePageItems(this.initialPage, true);
  }

  changeItemsCount(event) {
    this.itemsCount = event.target.value;
    this.loadActivePageItems(this.initialPage, true);
  }

  changeFilterLocation(event) {
    this.location = event.target.value;
    this.loadActivePageItems(this.initialPage, true);
  }

  changeFilterCategory(event) {
    this.category = event.target.value;
    this.loadActivePageItems(this.initialPage, true);
  }

  changeFilterEngagement(event) {
    this.engagement = event.target.value;
    this.loadActivePageItems(this.initialPage, true);
  }

  changeSortBy(event) {
    this.sortBy = event.target.value;
    this.loadActivePageItems(this.initialPage, true);
  }

  changeOrder(event) {
    const value = event.target.value;
    value === 'ASC' ? this.isAscending = true : this.isAscending = false;
    this.loadActivePageItems(this.initialPage, true);
  }

  showOrHideFilters() {
    this.showFilters = !this.showFilters;
    this.buttonText === 'Show Filters'
      ? this.buttonText = 'Hide Filters'
      : this.buttonText = 'Show Filters';
  }
}
