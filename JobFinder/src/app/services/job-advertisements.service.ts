import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobAd } from '../models/job-ad';
import { JobDetails } from '../models/job-details';
import { createAd, getAd, getAds } from '../core/controllers';

@Injectable({
  providedIn: 'root'
})
export class JobAdvertisementsService {

  constructor(private http: HttpClient) { }

  createJobAd(data: JobAd): Observable<Object> {
    return this.http.post(createAd(), data);
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

    return this.http.get<JobAd[]>(getAds(), { params });
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(getAd(id));
  }
}
