import { AllAdsResolved } from './../../../core/models/all-ads-resolved';
import { ActivatedRoute, Router } from '@angular/router';
import { DataListing } from './../../../core/models/common/data-listing';
import { JobAd } from './../../../core/models/job-ad';
import { Observable, Subscription } from 'rxjs';
import { JobAdsService } from './../../../core/services/job-ads.service';
import { Component, OnInit, OnDestroy, QueryList } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit, OnDestroy {
  categories$: Observable<object[]>;
  engagements$: Observable<object[]>;
  // allAdsResolved: AllAdsResolved;
  jobAds: JobAd[];
  totalCount: number;

  searchText = '';
  currentPage = 1;
  readonly initialPage = 1;

  jobAdsSubscription: Subscription;

  itemsCountArray = [5, 10, 15, 20, 30, 50, 100];
  itemsCount = this.itemsCountArray[0];
  locationsArray = ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven'];
  location = 'All';
  category = 0;
  engagement = 0;
  sortBy = 'Published';
  isAscending = false;
  showFiltersArea = false;
  buttonText = 'Show Filters';

  constructor(
    private jobAdsService: JobAdsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.route.snapshot.queryParamMap.get('page')) {
      this.currentPage = +this.route.snapshot.queryParamMap.get('page');
      this.itemsCount = +this.route.snapshot.queryParamMap.get('items');
      this.searchText = this.route.snapshot.queryParamMap.get('searchText');
      this.location = this.route.snapshot.queryParamMap.get('location');
      this.category = +this.route.snapshot.queryParamMap.get('category');
      this.engagement = +this.route.snapshot.queryParamMap.get('engagement');
      this.sortBy = this.route.snapshot.queryParamMap.get('sortBy');
      this.isAscending = this.route.snapshot.queryParamMap.get('isAscending') === 'true' ? true : false;
    }
  }

  ngOnInit() {
    this.getJobAds();
    this.categories$ = this.jobAdsService.getCategories();
    this.engagements$ = this.jobAdsService.getEngagements();
  }

  ngOnDestroy() {
    this.jobAdsSubscription.unsubscribe();
  }

  private getJobAds(): void {
    this.jobAdsSubscription = this.jobAdsService
      .all(this.currentPage, this.itemsCount, this.searchText, this.location,
        this.category, this.engagement, this.sortBy, this.isAscending)
      .pipe(
        tap((data) => console.log(data))
      )
      .subscribe((data: DataListing<JobAd>) => {
        this.totalCount = data.totalCount;
        this.jobAds = data.data;
      });

    // this.allAdsResolved = this.route.snapshot.data['allAdsResolved'];
  }

  searchJob(): void {
    this.currentPage = this.initialPage;
    this.updateQueryParams({ page: this.currentPage, searchText: this.searchText });
    this.getJobAds();
  }

  changeItemsCount(selectedItemsCount: number): void {
    this.itemsCount = selectedItemsCount;
    this.currentPage = this.initialPage;
    this.updateQueryParams({ page: this.currentPage, items: selectedItemsCount });
    this.getJobAds();
  }

  changeFilterLocation(selectedLocation: string): void {
    this.currentPage = this.initialPage;
    this.location = selectedLocation;
    this.updateQueryParams({ page: this.currentPage, location: selectedLocation });
    this.getJobAds();
  }

  changeFilterCategory(selectedCategory: number): void {
    this.currentPage = this.initialPage;
    this.category = selectedCategory;
    this.updateQueryParams({ page: this.currentPage, category: selectedCategory });
    this.getJobAds();
  }

  changeFilterEngagement(selectedEngagement: number): void {
    this.currentPage = this.initialPage;
    this.engagement = selectedEngagement;
    this.updateQueryParams({ page: this.currentPage, engagement: selectedEngagement });
    this.getJobAds();
  }

  changeSortBy(sortBy: string): void {
    this.currentPage = this.initialPage;
    this.sortBy = sortBy;
    this.updateQueryParams({ page: this.currentPage, sortBy: sortBy });
    this.getJobAds();
  }

  changeSortingOrder(orderValue: string): void {
    this.currentPage = this.initialPage;
    console.log(orderValue);
    orderValue === 'true' ? this.isAscending = true : this.isAscending = false;
    this.updateQueryParams({ page: this.currentPage, isAscending: orderValue });
    this.getJobAds();
  }

  loadActivePageItems(activePageNumber: number): void {
    if (this.currentPage === activePageNumber) {
      return;
    }
    this.currentPage = activePageNumber;
    this.updateQueryParams({ page: this.currentPage });
    this.getJobAds();
  }

  showOrHideFilters(): void {
    this.showFiltersArea = !this.showFiltersArea;
    this.buttonText === 'Show Filters'
      ? this.buttonText = 'Hide Filters'
      : this.buttonText = 'Show Filters';
  }

  private updateQueryParams(queryParamsObject: object): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: queryParamsObject,
        queryParamsHandling: 'merge'
      });
  }
}
