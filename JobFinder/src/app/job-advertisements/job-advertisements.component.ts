import { JobAdvertisementsService } from './../services/job-advertisements.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { BasicModel } from '../models/basic.model';
import { JobAd } from '../models/job-ad';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'jf-job-advertisements',
  templateUrl: './job-advertisements.component.html'
})
export class JobAdvertisementsComponent implements OnInit, OnDestroy {

  categories$!: Observable<BasicModel[]>;
  engagements$!: Observable<BasicModel[]>;
  jobAds!: JobAd[];
  totalCount!: number;

  searchText: string | null = '';
  readonly initialPage = 1;
  currentPage = this.initialPage;

  jobAdsSubscription!: Subscription;

  itemsCountArray = [5, 10, 15, 20, 30, 50, 100];
  itemsCount = this.itemsCountArray[0];
  locationsArray = ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven'];
  location: string | null = 'All';
  category: number = 0;
  engagement: number = 0;
  sortBy: string | null = 'Published';
  isAscending = false;
  showFiltersArea = false;
  buttonText = 'Show Filters';

  constructor(
    private jobAdsService: JobAdvertisementsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // TODO: refactor the whole method
    if (this.route.snapshot.queryParamMap.get('page')) {

      this.currentPage = parseInt(
        this.route.snapshot.queryParamMap.get('page')
        ?? this.initialPage.toString());

      this.itemsCount = parseInt(
        this.route.snapshot.queryParamMap.get('items')
        ?? this.itemsCountArray[0].toString());

      this.searchText = this.route.snapshot.queryParamMap.get('searchText');
      this.location = this.route.snapshot.queryParamMap.get('location');
      this.category = parseInt(this.route.snapshot.queryParamMap.get('category') ?? '0');
      this.engagement = parseInt(this.route.snapshot.queryParamMap.get('engagement') ?? '0');
      this.sortBy = this.route.snapshot.queryParamMap.get('sortBy');
      this.isAscending = this.route.snapshot.queryParamMap.get('isAscending') === 'true'
        ? true
        : false;
    }
  }

  ngOnInit(): void {
    this.getJobAds();
    this.categories$ = this.jobAdsService.getCategories();
    this.engagements$ = this.jobAdsService.getEngagements();
  }

  ngOnDestroy(): void {
    this.jobAdsSubscription.unsubscribe();
  }

  private getJobAds(): void {
    this.jobAdsSubscription = this.jobAdsService
      .all(
        this.currentPage,
        this.itemsCount,
        this.searchText ?? '',
        this.location ?? '',
        this.category,
        this.engagement,
        this.sortBy ?? '',
        this.isAscending)
      .subscribe((data: any) => {
        this.totalCount = data.totalCount;
        this.jobAds = data.data;
      });
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
