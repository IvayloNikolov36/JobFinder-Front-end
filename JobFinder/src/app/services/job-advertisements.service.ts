import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicModel } from '../models/basic.model';
import { JobAd } from '../models/job-ad';
import { JobDetails } from '../models/job-details';


const baseUrl = 'https://localhost:44357/api/ads';
const getEngagementsUrl = 'https://localhost:44357/api/jobEngagements';
const getCategoriesUrl = 'https://localhost:44357/api/jobCategories';

@Injectable({
  providedIn: 'root'
})
export class JobAdvertisementsService {

  constructor(private http: HttpClient) { }

  createjobAd(data: JobAd): Observable<Object> {
    return this.http.post(baseUrl + "/create", data);
  }

  all(page: number, items: number, searchText: string, location: string, category: number,
    engagement: number, sortBy: string, isAscending: boolean): Observable<JobAd[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('items', items.toString())
      .set('searchText', searchText)
      .set('location', location !== 'All' ? location : '')
      .set('sortBy', sortBy)
      .set('isAscending', isAscending.toString())
      .set('categoryId', category.toString())
      .set('engagementId', engagement.toString());

    return this.http.get<JobAd[]>(baseUrl, { params });
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(baseUrl + '/' + id);
  }

  getEngagements(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getEngagementsUrl);
  }

  getCategories(): Observable<BasicModel[]> {
    return this.http.get<BasicModel[]>(getCategoriesUrl);
  }
}
