import { DataListing } from './../models/common/data-listing';
import { JobDetails } from './../models/job-details';
import { Observable } from 'rxjs';
import { JobAd } from './../models/job-ad';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:44357/api/jobads';
const getEngagementsUrl = 'https://localhost:44357/api/jobEngagements';
const getCategoriesUrl = 'https://localhost:44357/api/jobCategories';

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {

  constructor(private http: HttpClient) { }

  createjobAd(data: JobAd) {
    return this.http.post(baseUrl, data);
  }

  all(page: number, items: number, searchText: string, location: string, category: number,
      engagement: number, sortBy: string, isAscending: boolean): Observable<DataListing<JobAd>> {
    const params = new HttpParams()
       .set('page', page.toString())
       .set('items', items.toString())
       .set('searchText', searchText)
       .set('location', location !== 'All' ? location : '')
       .set('sortBy', sortBy)
       .set('isAscending', isAscending.toString())
       .set('categoryId', category.toString())
       .set('engagementId', engagement.toString());

    return this.http.get<DataListing<JobAd>>(baseUrl, {params});
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(baseUrl + '/' + id);
  }

  getEngagements(): Observable<object[]> {
    return this.http.get<object[]>(getEngagementsUrl);
  }

  getCategories(): Observable<object[]> {
    return this.http.get<object[]>(getCategoriesUrl);
  }

}
