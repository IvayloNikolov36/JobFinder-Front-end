import { Observable } from 'rxjs';
import { JobAd } from './../models/job-ad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:44357/api/jobads/';
const createAdUrl =  baseUrl + 'create';
const getAllAdsUrl = baseUrl + 'all';
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

  getAll(): Observable<JobAd[]> {
    return this.http.get<JobAd[]>(getAllAdsUrl);
  }

  getEngagements(): Observable<object[]> {
    return this.http.get<object[]>(getEngagementsUrl);
  }

  getCategories(): Observable<object[]> {
    return this.http.get<object[]>(getCategoriesUrl);
  }

}
