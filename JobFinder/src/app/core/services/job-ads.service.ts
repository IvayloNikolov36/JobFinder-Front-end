import { Observable } from 'rxjs';
import { JobAd } from './../models/job-ad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:44357/api/jobads/';
const createAdUrl = baseUrl + 'create';
const getAllAdsUrl = baseUrl + 'get';
const getEngagementsUrl = baseUrl + 'engagements';
const getCategoriesUrl = baseUrl + 'categories';

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {
  userToken: string;

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('token');
  }

  createjobAd(data: JobAd) {
    return this.http.post(createAdUrl, data);
  }

  getAll(page: number, items: number, location: string, category: any, engagement: any)
    : Observable<JobAd[]> {
    let locationParam = '';
    if (location !== 'All') {
      locationParam = `&location=${location}`;
    }
    let categoryParam = '';
    if (category !== 'All') {
      categoryParam = `&categoryId=${category}`;
    }

    let engagementParam = '';
    if (engagement !== 'All') {
      engagementParam = `&engagementId=${engagement}`;
    }

    return this.http.get<JobAd[]>(
      getAllAdsUrl + `?page=${page}&items=${items}` + locationParam + categoryParam + engagementParam);
  }

  getEngagements(): Observable<object[]> {
    return this.http.get<object[]>(getEngagementsUrl);
  }

  getCategories(): Observable<object[]> {
    return this.http.get<object[]>(getCategoriesUrl);
  }

}
